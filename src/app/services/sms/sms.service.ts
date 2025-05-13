import { format } from 'date-fns';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { API_URL } from '../../app.token';
import {
  MessageDocument,
  SendMessage,
} from '../../main/messages/models/message.model';
import { SmsMesssage } from './sms.model';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  private dataSubject = new BehaviorSubject<Array<SmsMesssage> | null>(null);
  public data$ = this.dataSubject.asObservable();
  private collectionName = 'messages';
  unsubscribe: Unsubscribe | undefined;

  constructor(
    @Inject(API_URL) protected apiUrl: string,
    private db: Firestore,
    private http: HttpClient,
  ) {}

  getMessages(uid: string) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    const q = query(
      collection(this.db, this.collectionName),
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
    });
  }

  sendMessage(messageDetails: SendMessage): Observable<MessageDocument> {
    return this.http.post<MessageDocument>(
      `${this.apiUrl}/notification/announcement`,
      {
        ...messageDetails,
      },
    );
  }

  async loadAllMessage() {
    const q = query(
      collection(this.db, this.collectionName),
      orderBy('timestamp', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    const response: MessageDocument[] = [];
    querySnapshot.forEach((doc) => {
      response.push({
        ...(doc.data() as MessageDocument),
        id: doc.id,
      });
    });

    return response;
  }
}
