import { TestBed } from '@angular/core/testing';

import { AuthenticationResource } from './authentication.resource';

describe('AuthenticationResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationResource = TestBed.get(AuthenticationResource);
    expect(service).toBeTruthy();
  });
});
