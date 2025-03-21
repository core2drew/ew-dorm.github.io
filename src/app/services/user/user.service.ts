import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QueryFieldFilterConstraint,
} from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { User } from '../../stores/user/user.model';

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

  async getUsers(
    constraints: QueryFieldFilterConstraint[] = [],
  ): Promise<User[]> {
    const q = query(collection(this.db, 'users'), ...constraints);
    const querySnapshot = await getDocs(q);
    const response: User[] = [];
    querySnapshot.forEach((doc) => {
      response.push(doc.data() as User);
    });

    return response;
  }
}
