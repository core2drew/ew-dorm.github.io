import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { PaymentHistory } from '../main/payments-history/models/payment-history.model';
import { State } from '../shared/models/state.model';

export const paymentHistoryStore = createStore(
  { name: 'user' },
  withProps<State>({
    loaded: false,
    loading: false,
  }),
  withEntities<PaymentHistory>(),
);
