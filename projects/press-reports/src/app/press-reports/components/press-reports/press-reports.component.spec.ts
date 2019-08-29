import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReportsComponent } from './press-reports.component';

describe('PressReportsComponent', () => {
  let component: PressReportsComponent;
  let fixture: ComponentFixture<PressReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
