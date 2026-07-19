import { TestBed } from '@angular/core/testing';

import { ServiceVeille } from './service-veille';

describe('ServiceVeille', () => {
  let service: ServiceVeille;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVeille);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
