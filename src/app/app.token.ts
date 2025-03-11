import { inject, InjectionToken } from '@angular/core';

import { environment } from '../environments/environment';

export const ENVIRONMENT = new InjectionToken('environment', {
  factory: () => environment,
  providedIn: 'root',
});

export const API_URL = new InjectionToken<string>('api-url', {
  factory: () => inject(ENVIRONMENT).api.url,
  providedIn: 'root',
});
