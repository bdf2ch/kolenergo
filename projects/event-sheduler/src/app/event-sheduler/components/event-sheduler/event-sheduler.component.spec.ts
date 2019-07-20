import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShedulerComponent } from './event-sheduler.component';

describe('EventShedulerComponent', () => {
  let component: EventShedulerComponent;
  let fixture: ComponentFixture<EventShedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventShedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
