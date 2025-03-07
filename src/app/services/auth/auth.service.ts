import firebase from 'firebase/compat/app';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { ApprovalService } from '../approval/approval.service';

export type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private approvalService: ApprovalService,
    private messageService: MessageService,
  ) {}

  async checkApproval(response: UserCredential) {
    const isApproved = await this.approvalService.isUserApproved(
      response.user?.uid as string,
    );

    if (!isApproved) {
      this.messageService.add({
        severity: 'info',
        summary: 'Pending approval',
        detail:
          'Your account is pending approval. Please wait for admin approval.',
        life: 3000,
      });
      this.signOut();
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  // Sign in with email and password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.checkApproval(response);
      })
      .catch((error) => {
        const errorCode = error.code;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorCode as string,
          life: 3000,
        });
        throw errorCode;
      });
  }

  // Get current user
  getUser() {
    return this.afAuth.authState;
  }

  signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
