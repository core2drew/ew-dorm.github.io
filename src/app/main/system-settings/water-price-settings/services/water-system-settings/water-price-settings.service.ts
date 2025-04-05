import { format } from 'date-fns';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  QueryFieldFilterConstraint,
} from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { WaterPrice, WaterPriceDocument } from '../../models/water-price.model';

@Injectable({
  providedIn: 'root',
})
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

  async getWaterPrices(
    constraints: QueryFieldFilterConstraint[] = [],
  ): Promise<WaterPrice[]> {
    const q = query(
      collection(this.db, this.collectionName),
      ...constraints,
      orderBy('timestamp', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    const response: WaterPrice[] = [];
    querySnapshot.forEach((doc) => {
      const { timestamp, ...rest } = doc.data() as WaterPriceDocument;
      response.push({
        ...rest,
        id: doc.id,
        timestamp: format(timestamp.toDate(), 'MMMM d, y HH:mm a'),
      });
    });
    console.log(response);
    return response;
  }
}
