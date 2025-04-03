import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { ROLES } from '../../enums/roles';
import { ROUTE_PATH } from '../../enums/route-paths';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authRepo = inject(AuthRepoService);
  const router = inject(Router);
  const isAdmin = authRepo.currentUser()?.role == ROLES.ADMIN;
  if (isAdmin) {
    return true;
  }
  router.navigate([ROUTE_PATH.LOGIN]);
  return false;
};
