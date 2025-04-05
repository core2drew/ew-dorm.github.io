import { format } from 'date-fns';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { selectAllEntities } from '@ngneat/elf-entities';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Report } from '../../shared/models/report.model';
import { userStore } from '../../stores/user.store';
import { waterConsumptionStore } from '../../stores/water-consumption.store';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ReportRepository {
  data$ = new BehaviorSubject<Report[]>([]);

  constructor() {}

  getReport() {
    combineLatest({
      waterConsumptions: waterConsumptionStore.pipe(selectAllEntities()),
      users: userStore.pipe(selectAllEntities()),
    })
      .pipe(
        untilDestroyed(this),
        map(({ waterConsumptions, users }) => {
          return waterConsumptions.map((waterConsumption) => {
            const userConsumption = users.find(
              (wc) => wc.id === waterConsumption.uid,
            );

            return {
              ...waterConsumption,
              tenantName: userConsumption?.name,
              date: format(waterConsumption.timestamp, 'eee, MMM dd y'),
              time: format(waterConsumption.timestamp, 'HH:mm aa'),
            } as Report;
          });
        }),
      )
      .subscribe((data) => {
        this.data$.next(data);
      });
  }
}
