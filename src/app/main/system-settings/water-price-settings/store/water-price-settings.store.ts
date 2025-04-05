import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';

import { State } from '../../../../shared/models/state.model';
import { WaterPrice } from '../models/water-price.model';

export const waterPriceSettingsStore = createStore(
  { name: 'water-price-settings' },
  withProps<State>({
    loaded: false,
    loading: false,
  }),
  withEntities<WaterPrice>(),
  withActiveId(),
);
