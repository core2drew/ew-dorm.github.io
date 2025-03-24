import { State } from '../../../shared/models/state.model';

export type PaymentHistory = State & {
  id: string;
  month: string;
  year: string;
  totalConsumption: number;
  totalBill: number;
  status: boolean;
  uid: string;
};
