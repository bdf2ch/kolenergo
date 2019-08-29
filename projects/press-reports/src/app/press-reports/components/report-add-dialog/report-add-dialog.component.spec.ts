import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAddDialogComponent } from './report-add-dialog.component';

describe('ReportAddDialogComponent', () => {
  let component: ReportAddDialogComponent;
  let fixture: ComponentFixture<ReportAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
