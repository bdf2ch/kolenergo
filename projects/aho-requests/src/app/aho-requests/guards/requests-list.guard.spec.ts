import { TestBed, async, inject } from '@angular/core/testing';

import { RequestsListGuard } from './requests-list.guard';

describe('RequestsListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestsListGuard]
    });
  });

  it('should ...', inject([RequestsListGuard], (guard: RequestsListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
