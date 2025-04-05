import { format } from 'date-fns';
import {
  addDoc,
  collection,
  getDocs,
  query,
  QueryFieldFilterConstraint,
  Timestamp,
} from 'firebase/firestore';

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
  constructor(private db: Firestore) {}

  async createPayment(data: PaymentHistory) {
    const { id, ...rest } = data; // remove unnecessary id
    try {
      const timestamp = Timestamp.now();
      const newDoc = {
        ...rest,
        timestamp,
        month: format(timestamp.toDate(), 'MMMM'),
        year: format(timestamp.toDate(), 'y'),
        createdAt: timestamp.toDate(),
      };
      const data = await addDoc(
        collection(this.db, this.collectionName),
        newDoc,
      );
      return {
        ...newDoc,
        id: data.id,
      };
    } catch (err: unknown) {
      throw new Error(err as string);
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
