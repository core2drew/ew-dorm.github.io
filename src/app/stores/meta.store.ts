import { createStore, withProps } from '@ngneat/elf';

import { State } from '../shared/models/state.model';

export const metaStore = createStore(
  { name: 'meta' },
  withProps<State & { availableYears: number[] }>({
    loaded: false,
    loading: false,
    availableYears: [],
  }),
);
