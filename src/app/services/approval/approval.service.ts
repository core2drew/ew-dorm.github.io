import { doc, getDoc } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  constructor(private db: Firestore) {}

  async isUserApproved(userId: string): Promise<boolean> {
    const userDoc = await getDoc(doc(this.db, 'users', userId));
    if (!userDoc.exists() || !userDoc.data()['approved']) {
      return false;
    }
    return true;
  }
}
