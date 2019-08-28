import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeleteDialogComponent } from './report-delete-dialog.component';

describe('ReportDeleteDialogComponent', () => {
  let component: ReportDeleteDialogComponent;
  let fixture: ComponentFixture<ReportDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
