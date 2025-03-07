import { doc, getDoc } from 'firebase/firestore';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  constructor(
    private messageService: MessageService,
    private db: Firestore,
    private router: Router,
    private authService: AuthService,
  ) {}

  async isUserApproved(userId: string): Promise<boolean> {
    const userDoc = await getDoc(doc(this.db, 'users', userId));
    if (!userDoc.exists() || !userDoc.data()['approved']) {
      return false;
    }
    return true;
  }
}
