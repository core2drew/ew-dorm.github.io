import { map, take } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROUTE_PATH } from '../../enums/route-paths';
import { AuthService } from '../../services/auth/auth.service';

export const unauthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    take(1),
    map((user) => {
      if (user) {
        router.navigate([ROUTE_PATH.DASHBOARD]);
        return false;
      }
      return true;
    }),
  );
};
