import { map } from 'rxjs/operators';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROUTE_PATH } from '../../enums/route-paths';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    map((user) => {
      if (user) return true;
      router.navigate([ROUTE_PATH.LOGIN]);
      return false;
    }),
  );
};
