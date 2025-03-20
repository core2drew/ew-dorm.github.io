import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  onSnapshot,
  query,
  QueryFieldFilterConstraint,
  Timestamp,
  Unsubscribe,
  where,
  WhereFilterOp,
} from '@angular/fire/firestore';
import { select, setProps } from '@ngneat/elf';

import { AuthRepoService } from '../../../core/auth/auth-repo.service';
import { dashboardStore } from '../../../pages/dashboard/store/dashboard.store';
import { WaterConsumption } from '../../../shared/models/water-consumption.model';

@Injectable()
export class DashboardService {
  private dataSubject = new BehaviorSubject<Array<WaterConsumption> | null>(
    null,
  );
  public data$ = this.dataSubject.asObservable();
  public unsubscribe: Unsubscribe | undefined;

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

  constructor(private db: Firestore, private authRepo: AuthRepoService) {}

  getTenantWaterConsumption$(): Observable<WaterConsumption[] | null> {
    const uid = this.authRepo.currentUser()?.uid as string;
    this.subscribeToWaterConsumption([where('uid', '==', uid)]);
    return this.data$;
  }

  loadAllWaterConsumption() {
    dashboardStore.update(setProps({ loading: true }));
    this.subscribeToWaterConsumption();
    this.data$.subscribe((data) => {
      dashboardStore.update(setProps({ loading: false, loaded: true }));
    });
  }

  createQueryConstraints(fieldPath: [string, WhereFilterOp, string]) {
    return where(...fieldPath);
  }

  subscribeToWaterConsumption(constraints: QueryFieldFilterConstraint[] = []) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    const q = query(collection(this.db, 'water_consumption'), ...constraints);

    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const formattedData: WaterConsumption[] = querySnapshot.docs.map(
        (doc) => {
          const rawData = doc.data() as WaterConsumption;
          const timestamp = rawData.timestamp as unknown as Timestamp;
          return {
            id: doc.id,
            uid: rawData.uid,
            consumption: rawData.consumption,
            timestamp: timestamp.toDate().toLocaleDateString(),
          };
        },
      );
      this.dataSubject.next(formattedData);
      console.log('Real-time data:', formattedData);
    });
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
