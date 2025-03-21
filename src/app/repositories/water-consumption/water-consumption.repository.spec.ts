import { TestBed } from '@angular/core/testing';

import { WaterConsumptionRepository } from './water-consumption.repository';

describe('WaterConsumptionRepository', () => {
  let service: WaterConsumptionRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterConsumptionRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
