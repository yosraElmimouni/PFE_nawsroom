import { TestBed } from '@angular/core/testing';

import { ServiceCapture } from './service-capture';

describe('ServiceCapture', () => {
  let service: ServiceCapture;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCapture);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
export { ServiceCapture };

