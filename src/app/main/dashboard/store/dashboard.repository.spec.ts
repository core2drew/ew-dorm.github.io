import { TestBed } from '@angular/core/testing';

import { DashboardRepositoryService } from './dashboard.repository';

describe('DashboardRepositoryService', () => {
  let service: DashboardRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
