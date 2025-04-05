import { State } from '../../../../shared/models/state.model';

export type Room = State & {
  id: string;
  name: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
};
