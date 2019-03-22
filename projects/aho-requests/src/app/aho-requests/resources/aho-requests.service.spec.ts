import { TestBed } from '@angular/core/testing';

import { AhoRequestsResource } from './aho-requests.resource';

describe('AhoRequestsResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AhoRequestsResource = TestBed.get(AhoRequestsResource);
    expect(service).toBeTruthy();
  });
});
