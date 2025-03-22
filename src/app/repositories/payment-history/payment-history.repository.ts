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
  toArray,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PaymentHistory } from '../../main/payments-history/models/payment-history.model';
import { WaterConsumption } from '../../shared/models/water-consumption.model';
import { WaterConsumptionRepository } from '../water-consumption/water-consumption.repository';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PaymentHistoryRepository {
  data$ = new BehaviorSubject<PaymentHistory[]>([]);

  constructor(private waterConsumptionRepo: WaterConsumptionRepository) {}

  groupByMonthAndSum(
    source$: Observable<WaterConsumption[]>,
  ): Observable<PaymentHistory[]> {
    return source$.pipe(
      take(1),
      mergeMap((items) => from(items)), // Flatten array to stream

      groupBy((item) => format(new Date(item.timestamp), 'MMMM')), // Group by YYYY-MM

      mergeMap((group$) =>
        group$.pipe(
          reduce((acc, curr) => acc + curr.consumption, 0), // Sum consumption!

          map((totalConsumption) => ({
            id: uuidv4(),
            month: group$.key,
            totalConsumption,
            totalBill: totalConsumption * 10, // Example calculation
            status: false,
          })),
        ),
      ),

      toArray(), // Collect all PaymentHistory[]
    );
  }

  getPaymentHistory() {
    this.waterConsumptionRepo.entities$
      .pipe(
        filter((d) => d.length != 0),
        this.groupByMonthAndSum,
      )
      .subscribe((paymentHistory) => {
        console.log(paymentHistory);
        this.data$.next(paymentHistory);
      });
  }
}
