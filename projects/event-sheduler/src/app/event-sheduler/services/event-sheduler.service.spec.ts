import { TestBed } from '@angular/core/testing';

import { EventShedulerService } from './event-sheduler.service';

describe('EventShedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventShedulerService = TestBed.get(EventShedulerService);
    expect(service).toBeTruthy();
  });
});
