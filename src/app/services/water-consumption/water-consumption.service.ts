import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  Unsubscribe,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import {
  WaterConsumption,
  WaterConsumptionDocument,
} from '../../shared/models/water-consumption.model';

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
      ...[orderBy('timestamp', 'asc'), ...constraints],
    );

    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const formattedData: WaterConsumption[] = querySnapshot.docs.map(
        (doc) => {
          const rawData = doc.data() as WaterConsumptionDocument;
          const timestamp = rawData.timestamp;
          return {
            id: doc.id,
            uid: rawData.uid,
            consumption: rawData.consumption,
            timestamp: timestamp.toDate().toString(),
            roomNo: rawData.roomNo,
            pricePerMeter: rawData.pricePerMeter,
          };
        },
      );
      this.dataSubject.next(formattedData);
      console.log('Real-time data:', formattedData);
    });
  }
}
