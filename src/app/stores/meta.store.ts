import { createStore, withProps } from '@ngneat/elf';

import { State } from '../shared/models/state.model';
import { User } from '../shared/models/user.model';

export const metaStore = createStore(
  { name: 'meta' },
  withProps<
    State & {
      availableYears: number[];
      tenantPerYear: Partial<User>[];
    }
  >({
    loaded: false,
    loading: false,
    availableYears: [],
    tenantPerYear: [],
  }),
);
