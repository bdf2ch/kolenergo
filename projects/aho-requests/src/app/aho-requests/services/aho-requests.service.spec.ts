import { TestBed } from '@angular/core/testing';

import { AhoRequestsService } from './aho-requests.service';

describe('AhoRequestsResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AhoRequestsService = TestBed.get(AhoRequestsService);
    expect(service).toBeTruthy();
  });
});
