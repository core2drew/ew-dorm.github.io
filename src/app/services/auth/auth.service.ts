import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private messageService: MessageService,
  ) {}

  // Sign in with email and password
  signIn(email: string, password: string): Promise<UserCredential> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => response)
      .catch((error) => {
        const errorCode = error.code;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
          life: 3000,
        });
        return errorCode;
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
