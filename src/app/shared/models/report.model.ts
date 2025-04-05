import { WaterConsumption } from './water-consumption.model';

export type Report = Omit<WaterConsumption, 'timestamp'> & {
  tenantName: string;
  date: string;
  time: string;
};
