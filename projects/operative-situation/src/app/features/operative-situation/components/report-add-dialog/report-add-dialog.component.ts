import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import { IPeriod } from '../../../../interfaces';
import { selectSelectedPeriod } from '../../ngrx/selectors';

@Component({
  selector: 'app-report-add-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  public selectedPeriod$: Observable<IPeriod>;
  public equipmentHighVoltageForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {}

  ngOnInit() {
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.equipmentHighVoltageForm = this.builder.group({
      consumption: new FormControl(this.newReport.consumption),
      lep_110_150: new FormControl(this.newReport.equipment_35_150.lep_110_150),
      lep_35: new FormControl(this.newReport.equipment_35_150.lep_35),
      ps_110_150: new FormControl(this.newReport.equipment_35_150.ps_110_150),
      ps_35: new FormControl(this.newReport.equipment_35_150.ps_35),
      tp_6_20_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.tp_6_20),
      population_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.population),
      power_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.power),
      szo_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.szo),
      lep_6_20: new FormControl(this.newReport.equipment_network.lep_6_20),
      tp_6_20: new FormControl(this.newReport.equipment_network.tp_6_20),
      population_effect_network: new FormControl(this.newReport.equipment_network.effect.population),
      power_effect_network: new FormControl(this.newReport.equipment_network.effect.power),
      szo_effect_network: new FormControl(this.newReport.equipment_network.effect.szo),
      weather_min: new FormControl({value: this.newReport.weather.min, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_max: new FormControl({value: this.newReport.weather.max, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_wind: new FormControl({value: this.newReport.weather.wind, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_precipitations: new FormControl({value: this.newReport.weather.precipitations, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_rpg_1: new FormControl({value: this.newReport.weather.rpg, disabled: this.useWeatherSummary}),
      weather_orr_1: new FormControl({value: this.newReport.weather.orr, disabled: this.useWeatherSummary}),
      weather_rpg_2: new FormControl(this.newReport.weather.rpg),
      weather_orr_2: new FormControl(this.newReport.weather.orr),
      resources_rise: new FormControl(this.newReport.resources.rise),
      resources_rise_sum_power: new FormControl(this.newReport.resources.riseSumPower),
      resources_rise_people: new FormControl(this.newReport.resources.risePeople),
      resources_brigades: new FormControl(this.newReport.resources.brigades),
      resources_people: new FormControl(this.newReport.resources.people),
      resources_technics: new FormControl(this.newReport.resources.technics),
      violations_total_6: new FormControl(this.newReport.violations.total_6),
      violations_uapv_35: new FormControl(this.newReport.violations.uapv_35),
      violations_napv_35: new FormControl(this.newReport.violations.napv_35),
      violations_power_off_35: new FormControl(this.newReport.violations.power_off_35),
      violations_lep_rs: new FormControl(this.newReport.violations.lep_rs),
      violations_tn_cancel: new FormControl(this.newReport.violations.tn_cancel),
      violations_from_6_04: new FormControl(this.newReport.violations.from_6_04),
      violations_power_off_04: new FormControl(this.newReport.violations.power_off_04),
      violations_greater_3_04: new FormControl(this.newReport.violations.greater_3_04),
      violations_population_srez_o4: new FormControl(this.newReport.violations.population_srez_04),
      violations_population_greater_3_04: new FormControl(this.newReport.violations.population_greater_3_04),
      useWeatherSummary: new FormControl(this.useWeatherSummary)
    });
  }

}
