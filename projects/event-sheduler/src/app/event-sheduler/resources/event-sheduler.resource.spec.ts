import { TestBed } from '@angular/core/testing';

import { EventShedulerResource } from './event-sheduler.resource';

describe('EventShedulerResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventShedulerResource = TestBed.get(EventShedulerResource);
    expect(service).toBeTruthy();
  });
});
