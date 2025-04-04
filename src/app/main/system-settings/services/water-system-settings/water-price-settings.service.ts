import { addDoc, collection } from 'firebase/firestore';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { WaterPrice } from '../../models/water-price.model';

@Injectable()
export class WaterPriceSettingsService {
  private collectionName = 'water_price_settings';
  constructor(private db: Firestore, private messageService: MessageService) {}

  async createNewPrice(data: WaterPrice, callback: Function) {
    const { id, ...rest } = data; // remove unnecessary id
    try {
      await addDoc(collection(this.db, this.collectionName), {
        ...rest,
      });
      this.messageService.add({
        severity: 'info',
        summary: 'Price update',
        detail: 'New price will be used in succeeding computation',
        life: 3000,
      });
    } catch (err: unknown) {
      new Error(err as string);
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
