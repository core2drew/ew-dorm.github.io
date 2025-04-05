import { TestBed } from '@angular/core/testing';

import { RoomSettingsService } from './room-settings.service';

describe('RoomSettingsService', () => {
  let service: RoomSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
