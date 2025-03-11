import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
  readonly user$ = authStore.pipe(select((state) => state.user));

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.authService
      .getUser()
      .pipe(untilDestroyed(this))
      .subscribe(async (user) => {
        if (user) {
          const document = await this.userService.getUserDetails(
            user?.uid as string,
          );
          this.setAuthProps({
            loggedIn: true,
            user: {
              ...(document.data() as AuthUser),
              idToken: await user.getIdToken(),
            },
          });
        } else {
          this.clearAuthProps();
        }
      });
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
