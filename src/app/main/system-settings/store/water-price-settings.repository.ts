import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';

import { WaterPrice } from '../models/water-price.model';
import { WaterPriceSettingsService } from '../services/water-system-settings/water-price-settings.service';
import { waterPriceSettingsStore } from './water-price-settings.store';

@Injectable({
  providedIn: 'root',
})
export class WaterPriceSettingsRepository {
  constructor(
    private waterPriceSettingsService: WaterPriceSettingsService,
    private messageService: MessageService,
  ) {}

  async createNewPrice(data: WaterPrice, callback: Function) {
    waterPriceSettingsStore.update(setProps({ loading: true, loaded: false }));
    try {
      const doc = await this.waterPriceSettingsService.createNewPrice(data);
      waterPriceSettingsStore.update(
        upsertEntities({
          ...data,
          id: doc.id,
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
    }
  }
}
