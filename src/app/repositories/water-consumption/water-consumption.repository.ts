import { where } from 'firebase/firestore';
import { shareReplay } from 'rxjs';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';
import { selectAllEntities, upsertEntities } from '@ngneat/elf-entities';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { WaterConsumptionService } from '../../services/water-consumption/water-consumption.service';
import { WaterConsumption } from '../../shared/models/water-consumption.model';
import { waterConsumptionStore } from '../../stores/water-consumption.store';

@Injectable({
  providedIn: 'root',
})
export class WaterConsumptionRepository {
  loading$ = waterConsumptionStore.pipe(select((state) => state.loading));
  loaded$ = waterConsumptionStore.pipe(select((state) => state.loaded));
  entities$ = waterConsumptionStore.pipe(selectAllEntities(), shareReplay());

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
    waterConsumptionStore.update(setProps({ loading: true, loaded: false }));
    this.waterConsumptionService.subscribeToWaterConsumption();
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
}
