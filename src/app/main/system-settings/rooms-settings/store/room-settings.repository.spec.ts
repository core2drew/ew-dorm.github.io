import { TestBed } from '@angular/core/testing';

import { RoomSettingsRepositoryService } from './room-settings.repository';

describe('RoomSettingsRepositoryService', () => {
  let service: RoomSettingsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomSettingsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
