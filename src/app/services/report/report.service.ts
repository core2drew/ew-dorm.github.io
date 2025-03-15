import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { Report } from '../../pages/reports/models/report.model';

@Injectable()
export class ReportService {
  constructor(private db: Firestore) {}
  private dataSubject = new BehaviorSubject<Array<Report> | null>(null);
  public data$ = this.dataSubject.asObservable();

  async addData() {
    const citiesRef = collection(this.db, 'cities');

    await setDoc(doc(citiesRef, 'SF'), {
      name: 'San Francisco',
      state: 'CA',
      country: 'USA',
      capital: false,
      population: 860000,
      regions: ['west_coast', 'norcal'],
    });
    await setDoc(doc(citiesRef, 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      capital: false,
      population: 3900000,
      regions: ['west_coast', 'socal'],
    });
    await setDoc(doc(citiesRef, 'DC'), {
      name: 'Washington, D.C.',
      state: null,
      country: 'USA',
      capital: true,
      population: 680000,
      regions: ['east_coast'],
    });
    await setDoc(doc(citiesRef, 'TOK'), {
      name: 'Tokyo',
      state: null,
      country: 'Japan',
      capital: true,
      population: 9000000,
      regions: ['kanto', 'honshu'],
    });
    await setDoc(doc(citiesRef, 'BJ'), {
      name: 'Beijing',
      state: null,
      country: 'China',
      capital: true,
      population: 21500000,
      regions: ['jingjinji', 'hebei'],
    });
    await setDoc(doc(citiesRef, 'MNL'), {
      name: 'Manila',
      state: null,
      country: 'Philippines',
      capital: true,
      population: 21500000,
      regions: ['makati', 'qc', 'pasay'],
    });
  }

  async getRealTimeData() {
    const q = query(collection(this.db, 'water_consumption'));
    const unsub = onSnapshot(q, (querySnapshot) => {
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

    return unsub;
  }
}
