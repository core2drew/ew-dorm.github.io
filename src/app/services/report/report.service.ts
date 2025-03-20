import {
  collection,
  onSnapshot,
  Query,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { WaterConsumption } from '../../stores/water-consumption/water-consumption.model';

@Injectable()
export class ReportService {
  private readonly uid: string | undefined;
  private dataSubject = new BehaviorSubject<Array<WaterConsumption> | null>(
    null,
  );
  public data$ = this.dataSubject.asObservable();
  public unsubscribe: Unsubscribe | undefined;

  constructor(private db: Firestore, private authRepo: AuthRepoService) {
    this.uid = this.authRepo.currentUser()?.uid as string;
    this.init();
  }

  init() {
    const q = query(
      collection(this.db, 'water_consumption'),
      where('uid', '==', this.uid),
    );
    this.collectionData(q);
  }

  async filterByDate(dates: Date[]) {
    const q = query(
      collection(this.db, 'water_consumption'),
      where('timestamp', '>=', Timestamp.fromDate(dates[0])),
      where('timestamp', '<=', Timestamp.fromDate(dates[1])),
      where('uid', '==', this.uid),
    );
    this.collectionData(q);
  }

  collectionData(query: Query) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.unsubscribe = onSnapshot(query, (querySnapshot) => {
      const formattedData: WaterConsumption[] = querySnapshot.docs.map(
        (doc) => {
          const rawData = doc.data() as WaterConsumption;
          const timestamp = rawData.timestamp as unknown as Timestamp;
          return {
            id: doc.id,
            uid: rawData.uid,
            consumption: rawData.consumption,
            timestamp: timestamp.toDate().toLocaleDateString(),
          };
        },
      );
      this.dataSubject.next(formattedData);
      console.log('Real-time data:', formattedData);
    });
  }
}
