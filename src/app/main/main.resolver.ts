import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { AuthRepoService } from '../core/auth/auth-repo.service';

export const mainResolver: ResolveFn<void> = (route, state) => {
  const authRepoService = inject(AuthRepoService);
  return authRepoService.fetchUser();
};
