import { TestBed } from '@angular/core/testing';

import { ServiceDashJournaliste } from './service-dash-journaliste';

describe('ServiceDashJournaliste', () => {
  let service: ServiceDashJournaliste;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDashJournaliste);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
