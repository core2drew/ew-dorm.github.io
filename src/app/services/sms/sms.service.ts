import { format } from 'date-fns';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { Inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { API_URL } from '../../app.token';
import { SmsMesssage } from './sms.model';

@Injectable()
export class SmsService {
  private dataSubject = new BehaviorSubject<Array<SmsMesssage> | null>(null);
  public data$ = this.dataSubject.asObservable();
  private unsubscribe: Unsubscribe | undefined;

  constructor(
    @Inject(API_URL) protected apiUrl: string,
    private db: Firestore,
  ) {}

  getMessages(uid: string) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    const q = query(
      collection(this.db, 'messages'),
      where('uids', 'array-contains', uid),
      orderBy('timestamp', 'desc'),
    );
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const formattedData: SmsMesssage[] = querySnapshot.docs.map((doc) => {
        const rawData = doc.data();
        const timestamp = rawData['timestamp'] as Timestamp;
        return {
          message: rawData['message'],
          date: format(timestamp.toDate(), 'eee, MMM d'),
          time: format(timestamp.toDate(), 'h:mm aa'),
        };
      });
      this.dataSubject.next(formattedData);
      console.log('Real-time data:', formattedData);
    });
  }
}
