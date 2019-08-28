import { TestBed } from '@angular/core/testing';

import { PressReportsService } from './press-reports.service';

describe('PressReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PressReportsService = TestBed.get(PressReportsService);
    expect(service).toBeTruthy();
  });
});
