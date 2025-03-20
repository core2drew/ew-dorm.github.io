import { Injectable } from '@angular/core';

import { WaterConsumptionRepository } from '../../../stores/water-consumption/water-consumption.repository';

@Injectable()
export class DashboardService {
  constructor(private waterConsumptionRepo: WaterConsumptionRepository) {}

  getTodayConsumption() {
    this.waterConsumptionRepo.entities$.subscribe((d) => console.log(d));
  }
}
