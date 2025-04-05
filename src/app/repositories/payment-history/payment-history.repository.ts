import { format } from 'date-fns';
import { where } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
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
import {
  selectActiveEntity,
  selectAllEntities,
  setActiveId,
  setEntities,
  updateEntitiesByPredicate,
} from '@ngneat/elf-entities';
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
  activePaymentHistory$ = paymentHistoryStore.pipe(selectActiveEntity());

  private paidPaymentHistory: PaymentHistory[] | undefined;

  constructor(
    private waterConsumptionRepo: WaterConsumptionRepository,
    private paymentHistoryService: PaymentsHistoryService,
    private messageService: MessageService,
  ) {}

  private groupByMonthAndSum(
    source$: Observable<WaterConsumption[]>,
  ): Observable<PaymentHistory[]> {
    return source$.pipe(
      take(1),
      mergeMap((items) => from(items)), // Flatten array to stream

      groupBy((item) => format(item.timestamp, 'MMMM')), // Group by YYYY-MM

      mergeMap((group$) => {
        let uid = '';
        let year = '';
        let count = 0;
        return group$.pipe(
          tap((item) => {
            uid = item.uid;
            year = format(item.timestamp, 'y');
            count += 1;
          }),
          reduce(
            (acc, curr) => {
              return {
                totalConsumption: acc.totalConsumption + curr.consumption,
                pricePerCubicMeter: acc.pricePerCubicMeter + curr.pricePerMeter,
              };
            },
            { totalConsumption: 0, pricePerCubicMeter: 0 },
          ),
          map(({ totalConsumption, pricePerCubicMeter }) => ({
            id: uuidv4(),
            month: group$.key,
            totalConsumption: Number(totalConsumption.toFixed(2)),
            totalBalance: Number(
              (totalConsumption * pricePerCubicMeter).toFixed(2),
            ),
            pricePerCubicMeter: pricePerCubicMeter / count, // get average price per m3
            status: false,
            year,
            uid,
          })),
        );
      }),
      toArray(), // Collect all PaymentHistory[]
    );
  }

  setActivePaymentRecordById(id: string) {
    paymentHistoryStore.update(setActiveId(id));
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
        paymentHistoryStore.update(
          setEntities(
            (mergedPaidPaymentHistory || []).map(
              (d) => ({ ...d, loading: false, loaded: true } as PaymentHistory),
            ),
          ),
        );
      });
    paymentHistoryStore.update(setProps({ loading: false, loaded: true }));
  }

  async createPaymentRecord(data: PaymentHistory, callback: Function) {
    paymentHistoryStore.update(setProps({ loading: true, loaded: false }));
    try {
      const response = await this.paymentHistoryService.createPayment(data);
      paymentHistoryStore.update(
        updateEntitiesByPredicate(
          ({ month, year }) =>
            month === response.month && year === response.year,
          (entity) => ({ ...entity, loading: false, status: true }),
        ),
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Payment',
        detail: 'Payment has been created successfully',
        life: 3000,
      });
      callback();
    } catch (e) {
      console.log(e);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Uh oh! something went wrong.',
        life: 3000,
      });
    } finally {
      paymentHistoryStore.update(setProps({ loading: false, loaded: true }));
    }
  }
}
