import { InjectionToken } from '@angular/core';

import { environment } from '../environments/environment';

const apiUrl = process.env['api_url'] || environment.api.url;

export const API_URL = new InjectionToken<string>('api-url', {
  factory: () => apiUrl,
  providedIn: 'root',
});
