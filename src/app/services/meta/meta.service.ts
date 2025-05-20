import { getDoc } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private collectionName = 'meta';
  constructor(private db: Firestore) {}

  async getYears(): Promise<number[]> {
    try {
      const yearsRef = doc(this.db, this.collectionName, 'years');

      const snapshot = await getDoc(yearsRef);
      const data = snapshot.data();
      return snapshot.exists() ? data!['availableYears'] : [];
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }

  async getTenantPerYear(year: string): Promise<string[]> {
    try {
      const tenantPerYearRef = doc(
        this.db,
        this.collectionName,
        'tenantPerYear',
      );
      const snapshot = await getDoc(tenantPerYearRef);
      const data = snapshot.data();
      return snapshot.exists() ? data![year] : [];
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }
}
