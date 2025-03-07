import firebase from 'firebase/compat/app';
import { doc, getDoc } from 'firebase/firestore';
import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: Firestore,
    private messageService: MessageService,
  ) {}

  // Sign in with email and password
  signIn(email: string, password: string): Promise<UserCredential> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => response)
      .catch((error) => {
        const errorCode = error.code;
        throw errorCode;
      });
  }

  // Get current user
  getUser() {
    return this.afAuth.authState;
  }

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
      this.signOut();
      return;
    }

    this.router.navigate(['/dashboard']);
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
