import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { WaterConsumption } from '../../shared/models/water-consumption.model';

@Injectable({
  providedIn: 'root',
})
export class WaterConsumptionService {
  private dataSubject = new BehaviorSubject<Array<WaterConsumption> | null>(
    null,
  );
  public data$ = this.dataSubject.asObservable();
  public unsubscribe: Unsubscribe | undefined;

  constructor(private db: Firestore) {}

  subscribeToWaterConsumption(constraints: QueryFieldFilterConstraint[] = []) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    const q = query(
      collection(this.db, 'water_consumption'),
      ...[orderBy('timestamp'), ...constraints],
    );

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
            roomId: rawData.roomId,
          };
        },
      );
      this.dataSubject.next(formattedData);
      console.log('Real-time data:', formattedData);
    });
  }
}
