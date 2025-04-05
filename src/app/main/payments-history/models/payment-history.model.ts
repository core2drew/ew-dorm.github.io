import { PAYMENT_METHOD } from '../../../enums/payment-method';
import { State } from '../../../shared/models/state.model';

export type PaymentHistory = State & {
  id: string;
  month: string;
  year: string;
  totalConsumption: number;
  totalBalance: number;
  status: boolean;
  uid: string;
  paymentMethod?: PAYMENT_METHOD;
  timestamp?: string;
  pricePerCubicMeter?: number;
};
