import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { State } from '../shared/models/state.model';
import { User } from '../shared/models/user.model';

export const userStore = createStore(
  { name: 'user' },
  withProps<State>({
    loaded: false,
    loading: false,
  }),
  withEntities<User>(),
);
