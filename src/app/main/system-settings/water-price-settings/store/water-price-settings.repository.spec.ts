import { TestBed } from '@angular/core/testing';

import { WaterPriceSettingsRepository } from './water-price-settings.repository';

describe('WaterPriceSettingsRepository', () => {
  let service: WaterPriceSettingsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterPriceSettingsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
