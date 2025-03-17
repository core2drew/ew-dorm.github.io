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

import { Report } from '../../pages/reports/models/report.model';

@Injectable()
export class ReportService {
  private dataSubject = new BehaviorSubject<Array<Report> | null>(null);
  public data$ = this.dataSubject.asObservable();
  private subscription: Unsubscribe | undefined;

  constructor(private db: Firestore) {
    this.init();
  }

  init() {
    const q = query(collection(this.db, 'water_consumption'));
    this.collectionData(q);
  }

  async filterByDate(dates: Date[]) {
    const q = query(
      collection(this.db, 'water_consumption'),
      where('timestamp', '>=', Timestamp.fromDate(dates[0])),
      where('timestamp', '<=', Timestamp.fromDate(dates[1])),
    );
    this.collectionData(q);
  }

  collectionData(query: Query) {
    if (this.subscription) {
      this.subscription();
    }
    this.subscription = onSnapshot(query, (querySnapshot) => {
      const formattedData: Report[] = querySnapshot.docs.map((doc) => {
        const rawData = doc.data() as Report;
        const timestamp = rawData.timestamp as unknown as Timestamp;
        return {
          id: doc.id,
          consumerId: rawData.consumerId,
          roomId: rawData.roomId,
          liters: rawData.liters,
          timestamp: timestamp.toDate().toLocaleDateString(),
        };
      });
      this.dataSubject.next(formattedData);
      console.log('Real-time data:', formattedData);
    });
  }
}
