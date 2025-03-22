import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { WaterConsumptionRepository } from '../../../repositories/water-consumption/water-consumption.repository';

@UntilDestroy()
@Injectable()
export class ReportService {
  constructor(private waterConsumptionRepo: WaterConsumptionRepository) {}
}
