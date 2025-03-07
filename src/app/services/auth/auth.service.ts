import firebase from 'firebase/compat/app';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { UserService } from '../user/user.service';
import { UserCredentialError } from './auth.model';

export type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private authRepoService: AuthRepoService,
  ) {}

  async checkApproval(response: UserCredential) {
    const isApproved = await this.userService.isUserApproved(
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
  async signIn(email: string, password: string) {
    try {
      const response = await this.afAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      await this.checkApproval(response);
    } catch (error: unknown) {
      const err = error as UserCredentialError;
      const errCode = err.code;
      const errMsg = err.message;
      console.log(errMsg);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errCode,
        life: 3000,
      });

      throw errCode;
    }
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
