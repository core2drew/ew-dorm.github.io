import { doc, getDoc } from 'firebase/firestore';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  constructor(
    private messageService: MessageService,
    private db: Firestore,
    private router: Router,
  ) {}

  async checkApproval(userId: string) {
    const userDoc = await getDoc(doc(this.db, 'users', userId));
    if (!userDoc.exists() || !userDoc.data()['approved']) {
      this.messageService.add({
        severity: 'info',
        summary: 'Pending approval',
        detail:
          'Your account is pending approval. Please wait for admin approval.',
        life: 3000,
      });
      return;
    }

    this.router.navigate(['/dashboard']);
  }
}
