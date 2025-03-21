import { TestBed } from '@angular/core/testing';

import { ReportRepositoryService } from './report.repository';

describe('ReportRepositoryService', () => {
  let service: ReportRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
