import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedFormComponent } from './tabbed-form.component';

describe('StepFormComponent', () => {
  let component: TabbedFormComponent;
  let fixture: ComponentFixture<TabbedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
