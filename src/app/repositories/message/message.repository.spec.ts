import { TestBed } from '@angular/core/testing';

import { MessageRepository } from './message.repository';

describe('MessageRepository', () => {
  let service: MessageRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
