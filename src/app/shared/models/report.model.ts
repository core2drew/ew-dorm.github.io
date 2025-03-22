import { WaterConsumption } from './water-consumption.model';

export type Report = WaterConsumption & {
  tenantName: string;
};
