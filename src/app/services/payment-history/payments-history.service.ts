import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  QueryFieldFilterConstraint,
} from 'firebase/firestore';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PaymentHistory } from '../../main/payments-history/models/payment-history.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PaymentsHistoryService {
  private collectionName = 'payments';
  constructor(private db: Firestore, private messageService: MessageService) {}

  async createPayment(data: PaymentHistory) {
    const { id, ...rest } = data; // remove unnecessary id
    try {
      await addDoc(collection(this.db, this.collectionName), {
        ...rest,
      });
    } catch (err: unknown) {
      new Error(err as string);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Uh oh! something went wrong.',
        life: 3000,
      });
    }
  }

  async getPaymentHistory(
    constraints: QueryFieldFilterConstraint[] = [],
  ): Promise<PaymentHistory[]> {
    const q = query(collection(this.db, this.collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    const response: PaymentHistory[] = [];
    querySnapshot.forEach((doc) => {
      response.push(doc.data() as PaymentHistory);
    });
    return response;
  }
}
