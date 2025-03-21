import { collection, query, Timestamp, where } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { AuthRepoService } from '../../../core/auth/auth-repo.service';

@Injectable()
export class ReportService {
  private readonly uid: string | undefined;

  constructor(private db: Firestore, private authRepo: AuthRepoService) {
    this.uid = this.authRepo.currentUser()?.uid as string;
  }

  async filterByDate(dates: Date[]) {
    const q = query(
      collection(this.db, 'water_consumption'),
      where('timestamp', '>=', Timestamp.fromDate(dates[0])),
      where('timestamp', '<=', Timestamp.fromDate(dates[1])),
      where('uid', '==', this.uid),
    );
  }
}
