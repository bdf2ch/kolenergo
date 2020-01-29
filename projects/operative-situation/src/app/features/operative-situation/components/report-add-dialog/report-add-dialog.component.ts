import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import { IPeriod, IReport } from '../../../../interfaces';
import { selectSelectedPeriod } from '../../ngrx/selectors';
import { Report } from '../../../../models/report.model';

@Component({
  selector: 'app-report-add-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  public selectedPeriod$: Observable<IPeriod>;
  public equipment35150Form: FormGroup;
  public equipmentNetworkForm: FormGroup;
  public resourcesForm: FormGroup;
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
      lep_110_150: new FormControl(this.newReport.equipment_35_150.lep_110_150, Validators.required),
      lep_35: new FormControl(this.newReport.equipment_35_150.lep_35, Validators.required),
      ps_110_150: new FormControl(this.newReport.equipment_35_150.ps_110_150, Validators.required),
      ps_35: new FormControl(this.newReport.equipment_35_150.ps_35, Validators.required),
      tp_6_20_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.tp_6_20, Validators.required),
      population_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.population, Validators.required),
      power_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.power, Validators.required),
      szo_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.szo, Validators.required)
    });
    this.equipmentNetworkForm = this.builder.group({
      lep_6_20: new FormControl(this.newReport.equipment_network.lep_6_20, Validators.required),
      tp_6_20: new FormControl(this.newReport.equipment_network.tp_6_20, Validators.required),
      population_effect_network: new FormControl(this.newReport.equipment_network.effect.population, Validators.required),
      power_effect_network: new FormControl(this.newReport.equipment_network.effect.power, Validators.required),
      szo_effect_network: new FormControl(this.newReport.equipment_network.effect.szo, Validators.required)
    });
    this.resourcesForm = this.builder.group({
      resources_rise: new FormControl(this.newReport.resources.rise, Validators.required),
      resources_rise_sum_power: new FormControl(this.newReport.resources.riseSumPower, Validators.required),
      resources_rise_people: new FormControl(this.newReport.resources.risePeople, Validators.required),
      resources_brigades: new FormControl(this.newReport.resources.brigades, Validators.required),
      resources_people: new FormControl(this.newReport.resources.people, Validators.required),
      resources_technics: new FormControl(this.newReport.resources.technics, Validators.required),
    });
  }

}
