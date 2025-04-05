import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { MessageService } from 'primeng/api';

import { inject, Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';
import { selectAllEntities, upsertEntities } from '@ngneat/elf-entities';

import { WaterPrice } from '../models/water-price.model';
import { WaterPriceSettingsService } from '../services/water-system-settings/water-price-settings.service';
import { waterPriceSettingsStore } from './water-price-settings.store';

@Injectable({
  providedIn: 'root',
})
export class WaterPriceSettingsRepository {
  private waterPriceSettingsService = inject(WaterPriceSettingsService);
  loading$ = waterPriceSettingsStore.pipe(select((state) => state.loading));
  loaded$ = waterPriceSettingsStore.pipe(select((state) => state.loaded));
  entities$ = waterPriceSettingsStore.pipe(selectAllEntities());

  constructor(private messageService: MessageService) {}

  async loadAllPrices() {
    waterPriceSettingsStore.update(setProps({ loading: true, loaded: false }));
    const data = await this.waterPriceSettingsService.getWaterPrices();

    waterPriceSettingsStore.update(
      upsertEntities(data),
      setProps({ loading: false, loaded: true }),
    );
  }

  async selectLatestPrice$() {
    return this.entities$.subscribe((d) => console.log(d));
  }

  async createNewPrice(data: WaterPrice, callback: Function) {
    waterPriceSettingsStore.update(setProps({ loading: true, loaded: false }));
    try {
      const doc = await this.waterPriceSettingsService.createNewPrice(data);
      waterPriceSettingsStore.update(
        upsertEntities({
          ...data,
          id: doc.id,
          timestamp: format(
            (data.timestamp as unknown as Timestamp).toDate(),
            'MMMM d, y HH:mm aa',
          ),
        } as WaterPrice),
      );
      this.messageService.add({
        severity: 'info',
        summary: 'Price update',
        detail: 'New price will be used in succeeding computation',
        life: 3000,
      });
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Uh oh! something went wrong.',
        life: 3000,
      });
    } finally {
      callback();
      waterPriceSettingsStore.update(
        setProps({ loading: false, loaded: true }),
      );
    }
  }
}
