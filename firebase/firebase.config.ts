import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

export const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.appId,
  projectId: environment.projectId,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
