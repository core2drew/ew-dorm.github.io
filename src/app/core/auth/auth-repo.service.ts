import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select } from '@ngneat/elf';
import { UntilDestroy } from '@ngneat/until-destroy';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { AuthProps, AuthUser } from './auth.model';
import { authStore } from './auth.store';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthRepoService {
  readonly loggedIn$ = authStore.pipe(select((state) => state.loggedIn));
  readonly loading$ = authStore.pipe(select((state) => state.loading));
  readonly loaded$ = authStore.pipe(select((state) => state.loaded));
  readonly user$ = authStore.pipe(select((state) => state.user));
  readonly currentUser = toSignal(this.user$);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async fetchUser() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const document = await this.userService.getUserDetails(
        user?.uid as string,
      );
      this.setAuthProps({
        loading: false,
        loaded: true,
        loggedIn: true,
        user: {
          ...(document.data() as AuthUser),
          uid: user?.uid,
          idToken: await user.getIdToken(),
        },
      });
    } else {
      this.clearAuthProps();
    }
  }

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
