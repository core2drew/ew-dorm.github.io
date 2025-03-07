import { Injectable } from '@angular/core';

import { AuthProps } from './auth.model';
import { authStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthRepoService {
  constructor() {}

  clearAuthProps() {
    this.setAuthProps({
      loggedIn: false,
      user: undefined,
    });
  }

  setAuthProps(value: AuthProps) {
    authStore.update((state) => ({
      ...state,
      ...value,
    }));
  }
}
