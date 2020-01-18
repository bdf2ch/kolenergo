import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWrapperComponent } from './application-wrapper.component';

describe('ApplicationWrapperComponent', () => {
  let component: ApplicationWrapperComponent;
  let fixture: ComponentFixture<ApplicationWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
