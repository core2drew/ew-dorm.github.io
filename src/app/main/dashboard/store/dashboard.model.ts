import { State } from '../../../shared/models/state.model';

export type DashboardData = State & {
  todayConsumption: number;
  weeklyAvgConsumption: number;
  monthlyAvgConsumption: number;
  allYearConsumption: {
    monthLabels: string[];
    data: number[];
  };
};
