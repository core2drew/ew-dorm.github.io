import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { State } from '../../../shared/models/state.model';
import { Message } from '../models/message.model';

export const messageStore = createStore(
  { name: 'message' },
  withProps<State>({
    loaded: false,
    loading: false,
  }),
  withEntities<Message>(),
);
