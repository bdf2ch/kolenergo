import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ReportSummary, WeatherSummary, Report } from '../../../../models';
import { IApplicationState } from '../../../../ngrx';
import { selectSelectedReport } from '../../ngrx/selectors';


@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.less']
})
export class WeatherSummaryComponent implements OnInit {
  @Input() weatherSummary: WeatherSummary;
  @Input() showMode: boolean;
  public selectedReport$: Observable<Report>;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
  }

}
