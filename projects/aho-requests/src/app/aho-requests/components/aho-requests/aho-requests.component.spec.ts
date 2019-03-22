import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhoRequestsComponent } from './aho-requests.component';

describe('AhoRequestsComponent', () => {
  let component: AhoRequestsComponent;
  let fixture: ComponentFixture<AhoRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhoRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
