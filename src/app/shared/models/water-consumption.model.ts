import { Timestamp } from 'firebase/firestore';

export type WaterConsumption = {
  id: string;
  uid: string;
  consumption: number;
  roomNo: string;
  pricePerMeter: number;
  timestamp: string;
};

export type WaterConsumptionDocument = Omit<WaterConsumption, 'date'> & {
  timestamp: Timestamp;
};
