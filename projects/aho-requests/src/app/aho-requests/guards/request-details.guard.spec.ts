import { TestBed, async, inject } from '@angular/core/testing';

import { RequestDetailsGuard } from './request-details.guard';

describe('RequestDetailsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestDetailsGuard]
    });
  });

  it('should ...', inject([RequestDetailsGuard], (guard: RequestDetailsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
