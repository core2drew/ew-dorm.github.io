import { where } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { WaterConsumptionService } from '../../services/water-consumption/water-consumption.service';
import { WaterConsumption } from './water-consumption.model';
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
      waterConsumptionStore.update(
        upsertEntities(
          (data || []).map(
            (d) => ({ ...d, loading: false, loaded: true } as WaterConsumption),
          ),
        ),
      );
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
