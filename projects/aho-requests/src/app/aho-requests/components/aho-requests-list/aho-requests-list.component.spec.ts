import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhoRequestsListComponent } from './aho-requests-list.component';

describe('AhoRequestsListComponent', () => {
  let component: AhoRequestsListComponent;
  let fixture: ComponentFixture<AhoRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhoRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhoRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
