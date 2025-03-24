import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  enableProdMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { enableElfProdMode } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';
import Aura from '@primeng/themes/aura';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptor/auth.interceptor';

const isProd = process.env['production'] || environment.production;
const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = environment.firebaseConfig;

const firebaseConfig = {
  apiKey: process.env['firebaseConfig_apiKey'] || apiKey,
  authDomain: process.env['firebaseConfig_authDomain'] || authDomain,
  projectId: process.env['firebaseConfig_projectId'] || projectId,
  storageBucket: process.env['firebaseConfig_storageBucket'] || storageBucket,
  messagingSenderId:
    process.env['firebaseConfig_messagingSenderId'] || messagingSenderId,
  appId: process.env['firebaseConfig_appId'] || appId,
};

if (isProd) {
  enableProdMode();
  enableElfProdMode();
} else {
  devTools();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    MessageService,
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
