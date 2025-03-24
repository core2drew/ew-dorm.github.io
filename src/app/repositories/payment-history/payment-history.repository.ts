import { format } from 'date-fns';
import { where } from 'firebase/firestore';
import {
  filter,
  from,
  groupBy,
  map,
  mergeMap,
  Observable,
  reduce,
  shareReplay,
  take,
  tap,
  toArray,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';
import { selectAllEntities, setEntities } from '@ngneat/elf-entities';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PaymentHistory } from '../../main/payments-history/models/payment-history.model';
import { PaymentsHistoryService } from '../../services/payment-history/payments-history.service';
import { WaterConsumption } from '../../shared/models/water-consumption.model';
import { paymentHistoryStore } from '../../stores/payment-history.store';
import { WaterConsumptionRepository } from '../water-consumption/water-consumption.repository';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PaymentHistoryRepository {
  loading$ = paymentHistoryStore.pipe(select((state) => state.loading));
  loaded$ = paymentHistoryStore.pipe(select((state) => state.loaded));
  entities$ = paymentHistoryStore.pipe(selectAllEntities(), shareReplay());
  private paidPaymentHistory: PaymentHistory[] | undefined;

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
        let year = '';
        return group$.pipe(
          tap((item) => {
            uid = item.uid;
            year = format(new Date(item.timestamp), 'y');
          }),
          reduce((acc, curr) => acc + curr.consumption, 0), // Sum consumption!
          map((totalConsumption) => ({
            id: uuidv4(),
            month: group$.key,
            totalConsumption,
            totalBill: totalConsumption * 10, // Example calculation
            status: false,
            year,
            uid,
          })),
        );
      }),

      toArray(), // Collect all PaymentHistory[]
    );
  }

  async getPaymentsHistory(uid?: string) {
    paymentHistoryStore.update(setProps({ loading: true, loaded: false }));
    this.paidPaymentHistory =
      await this.paymentHistoryService.getPaymentHistory([
        where('uid', '==', uid!),
      ]);

    this.waterConsumptionRepo.entities$
      .pipe(
        filter((d) => d.length != 0),
        map((consumptions) => {
          if (uid) {
            return consumptions.filter((d) => d.uid == uid);
          }
          return consumptions;
        }),
        this.groupByMonthAndSum,
        filter((consumptions) =>
          consumptions.some((consumption) => consumption.uid === uid),
        ),
      )
      .subscribe((data) => {
        const mergedPaidPaymentHistory = data.map((historyData) => {
          return {
            ...historyData,
            status: this.paidPaymentHistory?.some(
              (data) =>
                data.month === historyData.month &&
                data.year == historyData.year,
            ),
          };
        });
        paymentHistoryStore.update(setProps({ loading: false, loaded: true }));
        paymentHistoryStore.update(
          setEntities(
            (mergedPaidPaymentHistory || []).map(
              (d) => ({ ...d, loading: false, loaded: true } as PaymentHistory),
            ),
          ),
        );
      });
  }
}
