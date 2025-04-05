import { TestBed } from '@angular/core/testing';

import { PrintReceiptService } from './print-receipt.service';

describe('PrintReceiptService', () => {
  let service: PrintReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
