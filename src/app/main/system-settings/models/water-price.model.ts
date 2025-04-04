import { Timestamp } from 'firebase/firestore';

export type WaterPrice = {
  id: string;
  price: number;
  timestamp: string;
};

export type WaterPriceDocument = Omit<WaterPrice, 'timestamp'> & {
  timestamp: Timestamp;
};
