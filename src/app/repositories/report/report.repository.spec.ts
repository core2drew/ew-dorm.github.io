import { TestBed } from '@angular/core/testing';

import { ReportRepository } from './report.repository';

describe('ReportRepository', () => {
  let service: ReportRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
