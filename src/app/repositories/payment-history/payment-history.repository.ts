import { format } from 'date-fns';
import {
  BehaviorSubject,
  filter,
  from,
  groupBy,
  map,
  mergeMap,
  Observable,
  reduce,
  take,
  tap,
  toArray,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PaymentHistory } from '../../main/payments-history/models/payment-history.model';
import { PaymentsHistoryService } from '../../services/payment-history/payments-history.service';
import { WaterConsumption } from '../../shared/models/water-consumption.model';
import { WaterConsumptionRepository } from '../water-consumption/water-consumption.repository';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PaymentHistoryRepository {
  data$ = new BehaviorSubject<PaymentHistory[]>([]);

  constructor(
    private waterConsumptionRepo: WaterConsumptionRepository,
    private paymentHistoryService: PaymentsHistoryService,
  ) {}

  private groupByMonthAndSum(
    source$: Observable<WaterConsumption[]>,
  ): Observable<PaymentHistory[]> {
    return source$.pipe(
      take(1),
      mergeMap((items) => from(items)), // Flatten array to stream

      groupBy((item) => format(new Date(item.timestamp), 'MMMM')), // Group by YYYY-MM

      mergeMap((group$) => {
        let uid = '';
        return group$.pipe(
          tap((item) => (uid = item.uid)),
          reduce((acc, curr) => acc + curr.consumption, 0), // Sum consumption!
          map((totalConsumption) => ({
            id: uuidv4(),
            month: group$.key,
            totalConsumption,
            totalBill: totalConsumption * 10, // Example calculation
            status: false,
            uid,
          })),
        );
      }),

      toArray(), // Collect all PaymentHistory[]
    );
  }

  async getAllPaymentHistory() {
    const paymentHistory = await this.paymentHistoryService.getPaymentHistory();
  }

  async getTenantPaymentHistory(uid: string) {
    const paymentHistory = await this.paymentHistoryService.getPaymentHistory();
    this.waterConsumptionRepo.entities$
      .pipe(
        filter((d) => d.length != 0),
        map((consumptions) => {
          return consumptions.filter((d) => d.uid == uid);
        }),
        this.groupByMonthAndSum,
      )
      .subscribe((paymentHistory) => {
        console.log(paymentHistory);
        this.data$.next(paymentHistory);
      });
  }
}
