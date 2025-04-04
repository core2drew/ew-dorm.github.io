import { Timestamp } from 'firebase/firestore';

export type WaterPrice = {
  id: string;
  price: number;
  timestamp: Timestamp;
};
