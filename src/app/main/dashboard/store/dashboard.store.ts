import { createStore, withProps } from '@ngneat/elf';

import { DashboardData } from './dashboard.model';

export const dashboardStore = createStore(
  { name: 'dashboard' },
  withProps<DashboardData>({
    loaded: false,
    error: false,
    saving: false,
    loading: false,
    todayConsumption: 0,
    weeklyAvgConsumption: 0,
    monthlyAvgConsumption: 0,
    allYearConsumption: [],
  }),
);
