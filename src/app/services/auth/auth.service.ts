import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import '@angular/fire/compat/auth';

type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Sign in with email and password
  signIn(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Get current user
  getUser() {
    return this.afAuth.authState;
  }
}
