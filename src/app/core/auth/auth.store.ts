import { createStore, withProps } from '@ngneat/elf';

import { AuthProps } from './auth.model';

export const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ loggedIn: false }),
);
