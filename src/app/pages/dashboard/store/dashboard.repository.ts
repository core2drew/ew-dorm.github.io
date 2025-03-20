import { where } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';

import { AuthRepoService } from '../../../core/auth/auth-repo.service';
import { DashboardService } from '../services/dashboard.service';
import { dashboardStore } from './dashboard.store';

@Injectable()
export class DashboardRepositoryService {
  constructor(
    private dashboardService: DashboardService,
    private authRepo: AuthRepoService,
  ) {}

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

  getWaterConsumptionRecord() {
    const uid = this.authRepo.currentUser()?.uid as string;
    const queryConstraints = [where('uid', '==', uid)];
    this.dashboardService.subscribeToWaterConsumption(queryConstraints);
    this.dashboardService.data$.subscribe((data) => {
      dashboardStore.update(setProps({ loading: false, loaded: true }));
    });
  }

  getAllWaterConsumptionRecord() {
    dashboardStore.update(setProps({ loading: true, loaded: true }));
    this.subscribeToWaterConsumption();
    this.dashboardService.data$.subscribe((data) => {
      dashboardStore.update(setProps({ loading: false, loaded: true }));
    });
  }
  subscribeToWaterConsumption() {
    throw new Error('Method not implemented.');
  }

  private getTodayConsumption() {
    // manipulate dashboard store data to get only today's data
  }

  private getWeeklyAverageConsumption() {
    // dashboard filter store to get only the weekly average
  }

  private getMonthlyAverageConsumption() {
    // dashboard filter store to get the monlth average
  }

  private getAllMonthsConsumption() {}
}
