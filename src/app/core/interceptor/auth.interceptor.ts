import { switchMap, take } from 'rxjs';

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthRepoService } from '../auth/auth-repo.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authRepository = inject(AuthRepoService);

  return authRepository.user$.pipe(
    take(1),
    switchMap((user) => {
      if (user?.idToken) {
        request = request.clone({
          headers: request.headers.append(
            'Authorization',
            `Bearer ${user.idToken}`,
          ),
        });
      }
      return next(request);
    }),
  );
};
