import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import {IPeriod, IReport} from '../../../../interfaces';
import { selectSelectedPeriod } from '../../ngrx/selectors';
import {Report} from '../../../../models/report.model';

@Component({
  selector: 'app-report-add-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  public selectedPeriod$: Observable<IPeriod>;
  public equipment35150Form: FormGroup;
  public equipmentNetworkForm: FormGroup;
  public newReport: Report;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.newReport = new Report();
  }

  ngOnInit() {
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.equipment35150Form = this.builder.group({
      lep_110_150: new FormControl(this.newReport.equipment_35_150.lep_110_150),
      lep_35: new FormControl(this.newReport.equipment_35_150.lep_35),
      ps_110_150: new FormControl(this.newReport.equipment_35_150.ps_110_150),
      ps_35: new FormControl(this.newReport.equipment_35_150.ps_35),
      tp_6_20_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.tp_6_20),
      population_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.population),
      power_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.power),
      szo_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.szo)
    });
    this.equipmentNetworkForm = this.builder.group({
      lep_6_20: new FormControl(this.newReport.equipment_network.lep_6_20),
      tp_6_20: new FormControl(this.newReport.equipment_network.tp_6_20),
      population_effect_network: new FormControl(this.newReport.equipment_network.effect.population),
      power_effect_network: new FormControl(this.newReport.equipment_network.effect.power),
      szo_effect_network: new FormControl(this.newReport.equipment_network.effect.szo)
    });
  }

}
