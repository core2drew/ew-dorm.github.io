import { format } from 'date-fns/format';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomSettingsService {
  private collectionName = 'rooms';
  constructor(private db: Firestore) {}

  async getRooms(constraints: QueryFieldFilterConstraint[] = []) {
    const q = query(
      collection(this.db, this.collectionName),
      ...constraints,
      orderBy('updatedAt', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    const response: Room[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Room;
      response.push({
        ...data,
        id: doc.id,
      });
    });
    console.log(response);
    return response;
  }

  async createRoom(data: Room) {
    const { id, ...rest } = data; // remove unnecessary id
    const createdAt = format(Timestamp.now().toDate(), 'MM/dd/y');
    const updatedAt = format(Timestamp.now().toDate(), 'MM/dd/y');
    try {
      const document = await addDoc(collection(this.db, this.collectionName), {
        ...rest,
        createdAt,
        updatedAt,
      });
      return {
        ...rest,
        id: document.id,
        createdAt,
        updatedAt,
      };
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }

  async updateRoom(data: Room) {
    const { id, ...rest } = data;
    const updatedAt = format(Timestamp.now().toDate(), 'MM/dd/y');
    try {
      const roomDoc = doc(this.db, this.collectionName, id);
      await updateDoc(roomDoc, {
        ...rest,
        updatedAt,
      });
      return {
        ...rest,
        id,
      };
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }
}
