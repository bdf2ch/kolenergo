import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsWrapperComponent } from './applications-wrapper.component';

describe('ApplicationsComponent', () => {
  let component: ApplicationsWrapperComponent;
  let fixture: ComponentFixture<ApplicationsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
