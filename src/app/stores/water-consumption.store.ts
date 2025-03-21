import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { State } from '../shared/models/state.model';
import { WaterConsumption } from '../shared/models/water-consumption.model';

export const waterConsumptionStore = createStore(
  { name: 'water-consumption' },
  withProps<State>({
    loaded: false,
    loading: false,
  }),
  withEntities<WaterConsumption>(),
);
