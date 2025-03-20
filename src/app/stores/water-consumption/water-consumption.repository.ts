import { where } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { WaterConsumptionService } from '../../services/water-consumption/water-consumption.service';
import { waterConsumptionStore } from './water-consumption.store';

@Injectable({
  providedIn: 'root',
})
export class WaterConsumptionRepository {
  loading$ = waterConsumptionStore.pipe(select((state) => state.loading));
  loaded$ = waterConsumptionStore.pipe(select((state) => state.loaded));

  constructor(
    private waterConsumptionService: WaterConsumptionService,
    private authRepo: AuthRepoService,
  ) {}

  getWaterConsumptionRecord() {
    const uid = this.authRepo.currentUser()?.uid as string;
    const queryConstraints = [where('uid', '==', uid)];
    this.waterConsumptionService.subscribeToWaterConsumption(queryConstraints);
    this.waterConsumptionService.data$.subscribe((data) => {
      waterConsumptionStore.update(setProps({ loading: false, loaded: true }));
    });
    return this.waterConsumptionService.unsubscribe;
  }

  getAllWaterConsumptionRecord() {
    waterConsumptionStore.update(setProps({ loading: true, loaded: true }));
    this.waterConsumptionService.subscribeToWaterConsumption();
    this.waterConsumptionService.data$.subscribe((data) => {
      waterConsumptionStore.update(setProps({ loading: false, loaded: true }));
    });

    return this.waterConsumptionService.unsubscribe;
  }
}
