import {
  collection,
  getDocs,
  query,
  QueryFieldFilterConstraint,
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
  private collectionName = 'payment';
  constructor(private db: Firestore) {}

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
