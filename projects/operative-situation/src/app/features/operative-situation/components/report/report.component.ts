import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState } from '../../../../ngrx';
import { IReport } from '../../../../interfaces';
import { Report} from '../../../../models';
import { selectSelectedReport } from '../../ngrx/selectors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  public selectedReport$: Observable<Report>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
  }

}
