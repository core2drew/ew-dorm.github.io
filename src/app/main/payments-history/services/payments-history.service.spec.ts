import { TestBed } from '@angular/core/testing';

import { PaymentsHistoryService } from './payments-history.service';

describe('PaymentsHistoryService', () => {
  let service: PaymentsHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
