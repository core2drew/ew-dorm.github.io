import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore) {}

  async isUserApproved(userId: string): Promise<boolean> {
    const userDoc = await this.getUserDetails(userId);
    if (!userDoc.exists() || !userDoc.data()['approved']) {
      return false;
    }
    return true;
  }

  async getUserDetails(userId: string): Promise<DocumentSnapshot> {
    const userDoc = await getDoc(doc(this.db, 'users', userId));
    return userDoc;
  }
}
