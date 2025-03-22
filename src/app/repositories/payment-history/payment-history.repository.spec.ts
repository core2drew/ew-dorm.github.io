import { TestBed } from '@angular/core/testing';

import { PaymentHistoryRepository } from './payment-history.repository';

describe('PaymentHistoryRepository', () => {
  let service: PaymentHistoryRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentHistoryRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
