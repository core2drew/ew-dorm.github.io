import { addDoc, collection } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { WaterPrice } from '../../models/water-price.model';

@Injectable()
export class WaterPriceSettingsService {
  private collectionName = 'water_price_settings';
  constructor(private db: Firestore) {}

  async createNewPrice(data: WaterPrice) {
    const { id, ...rest } = data; // remove unnecessary id
    try {
      const document = await addDoc(collection(this.db, this.collectionName), {
        ...rest,
      });
      return document;
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }
}
