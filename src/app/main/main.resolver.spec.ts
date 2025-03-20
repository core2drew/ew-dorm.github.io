import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mainResolver } from './main.resolver';

describe('mainResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => mainResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
