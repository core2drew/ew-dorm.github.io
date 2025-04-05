import { TestBed } from '@angular/core/testing';

import { WaterPriceSettingsService } from './water-price-settings.service';

describe('WaterSystemSettingsService', () => {
  let service: WaterPriceSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterPriceSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
