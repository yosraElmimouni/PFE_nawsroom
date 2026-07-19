import { TestBed } from '@angular/core/testing';

import { ServiceAgenda } from './service-agenda';

describe('ServiceAgenda', () => {
  let service: ServiceAgenda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAgenda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
