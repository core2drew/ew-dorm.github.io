import { format } from 'date-fns';
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { API_URL } from '../../app.token';
import { ROLES } from '../../enums/roles';
import { User, UserDocument } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject(API_URL) protected apiUrl: string,
    private db: Firestore,
    private http: HttpClient,
  ) {}

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
    const q = query(
      collection(this.db, 'users'),
      ...[where('role', '!=', ROLES.ADMIN), ...constraints],
      orderBy('createdAt', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    const response: User[] = [];
    querySnapshot.forEach((doc) => {
      const { createdAt, updatedAt, ...rest } = doc.data() as UserDocument;

      response.push({
        ...(rest as User),
        createdAt: createdAt ? format(createdAt.toDate(), 'MMM dd, y') : '',
        updatedAt: updatedAt ? format(updatedAt.toDate(), 'MMM dd, y') : '',
      });
    });

    return response;
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/create`, {
      ...user,
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/update`, {
      ...user,
    });
  }
}
