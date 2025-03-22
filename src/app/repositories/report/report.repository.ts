import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { selectAllEntities } from '@ngneat/elf-entities';

import { Report } from '../../shared/models/report.model';
import { userStore } from '../../stores/user.store';
import { waterConsumptionStore } from '../../stores/water-consumption.store';

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
        map(({ waterConsumptions, users }) => {
          return waterConsumptions.map((waterConsumption) => {
            const userConsumption = users.find(
              (wc) => wc.id === waterConsumption.uid,
            );
            const { firstName, lastName } = userConsumption || {};
            return {
              ...waterConsumption,
              tenantName: `${firstName} ${lastName}`,
            } as Report;
          });
        }),
      )
      .subscribe((data) => {
        this.data$.next(data);
      });
  }

  filterReportByDate(dates: Date[]) {}
}
