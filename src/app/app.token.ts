import { InjectionToken } from '@angular/core';

import { environment } from '../environments/environment';

const apiUrl = environment.api.url;

export const API_URL = new InjectionToken<string>('api-url', {
  factory: () => apiUrl,
  providedIn: 'root',
});
