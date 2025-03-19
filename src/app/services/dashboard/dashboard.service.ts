import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';

import { dashboardStore } from '../../pages/dashboard/store/dashboard.store';
import { WaterConsumption } from '../../shared/models/water-consumption.model';

@Injectable()
export class DashboardService {
  private dataSubject = new BehaviorSubject<Array<WaterConsumption> | null>(
    null,
  );
  public data$ = this.dataSubject.asObservable();

  readonly todayConsumption = dashboardStore.pipe(
    select((state) => state.todayConsumption),
  );
  readonly weeklyAvgConsumption = dashboardStore.pipe(
    select((state) => state.weeklyAvgConsumption),
  );
  readonly monthlyAvgConsumption = dashboardStore.pipe(
    select((state) => state.monthlyAvgConsumption),
  );
  readonly allYearConsumption = dashboardStore.pipe(
    select((state) => state.allYearConsumption),
  );

  constructor() {}

  getAllConsumptionData() {
    // get all data and store it in dashboard store
  }

  getTodayConsumption() {
    // manipulate dashboard store data to get only today's data
  }

  getWeeklyAverageConsumption() {
    // dashboard filter store to get only the weekly average
  }

  getMonthlyAverageConsumption() {
    // dashboard filter store to get the monlth average
  }

  getAllMonthsConsumption() {}
}
