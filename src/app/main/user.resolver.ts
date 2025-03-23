import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { AuthRepoService } from '../core/auth/auth-repo.service';

export const userResolver: ResolveFn<boolean> = async (route, state) => {
  const authRepoService = inject(AuthRepoService);
  await authRepoService.fetchUser();
  return true;
};
