import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';

import { State } from '../../../../shared/models/state.model';
import { Room } from '../models/room.model';

export const roomSettingsStore = createStore(
  { name: 'room-settings' },
  withProps<State>({
    loaded: false,
    loading: false,
  }),
  withEntities<Room>(),
  withActiveId(),
);
