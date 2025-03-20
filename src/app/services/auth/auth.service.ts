import firebase from 'firebase/compat/app';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { ROUTE_PATH } from '../../enums/route-paths';
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
    }

    return isApproved;
  }

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const response = await this.afAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      const isApproved = await this.checkApproval(response);
      if (isApproved) {
        this.router.navigate([ROUTE_PATH.DASHBOARD]);
      } else {
        this.signOut();
      }
    } catch (error: unknown) {
      const err = error as UserCredentialError;
      const errCode = err.code;

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

  getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate([ROUTE_PATH.LOGIN]);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
