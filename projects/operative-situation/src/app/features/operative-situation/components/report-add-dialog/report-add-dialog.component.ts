import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import {IDivision, IPeriod, IReport} from '../../../../interfaces';
import {selectSelectedDivision, selectSelectedPeriod, selectUser} from '../../ngrx/selectors';
import { Report } from '../../../../models/report.model';
import {AddReport} from '../../ngrx';
import {User} from '@kolenergo/core';

@Component({
  selector: 'app-report-add-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  private user$: Observable<User>;
  private user: User;
  private selectedDivision$: Observable<IDivision>;
  private selectedDivision: IDivision;
  public selectedPeriod$: Observable<IPeriod>;
  private selectedPeriod: IPeriod;
  public equipment35150Form: FormGroup;
  public equipmentNetworkForm: FormGroup;
  public resourcesForm: FormGroup;
  public violationsForm: FormGroup;
  public newReport: Report;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {

    this.newReport = new Report();
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
    this.user$.subscribe((value: User) => {
      this.user = value;
    });
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.selectedDivision$.subscribe((value: IDivision) => {
      this.selectedDivision = value;
    });
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.selectedPeriod$.subscribe((value: IPeriod) => {
      this.selectedPeriod = value;
    });
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
    this.violationsForm = this.builder.group({
      violations_total_6: new FormControl(this.newReport.violations.total_6, Validators.required),
      violations_uapv_35: new FormControl(this.newReport.violations.uapv_35, Validators.required),
      violations_napv_35: new FormControl(this.newReport.violations.napv_35, Validators.required),
      violations_power_off_35: new FormControl(this.newReport.violations.power_off_35, Validators.required),
      violations_lep_rs: new FormControl(this.newReport.violations.lep_rs, Validators.required),
      violations_tn_cancel: new FormControl(this.newReport.violations.tn_cancel, Validators.required),
      violations_from_6_04: new FormControl(this.newReport.violations.from_6_04, Validators.required),
      violations_power_off_04: new FormControl(this.newReport.violations.power_off_04, Validators.required),
      violations_greater_3_04: new FormControl(this.newReport.violations.greater_3_04, Validators.required),
      violations_population_srez_o4: new FormControl(this.newReport.violations.population_srez_04, Validators.required),
      violations_population_greater_3_04: new FormControl(this.newReport.violations.population_greater_3_04, Validators.required),
    });
  }

  /**
   * Добавление отчета об оперативной обстановке
   */
  addReport() {
    this.newReport.user = this.user;
    this.newReport.companyId = this.selectedDivision.companyId;
    this.newReport.divisionId = this.selectedDivision.id;
    this.newReport.periodTime = this.selectedPeriod;
    this.newReport.equipment_35_150.lep_110_150 = this.equipment35150Form.controls.lep_110_150.value;
    this.newReport.equipment_35_150.lep_35 = this.equipment35150Form.controls.lep_35.value;
    this.newReport.equipment_35_150.ps_110_150 = this.equipment35150Form.controls.ps_110_150.value;
    this.newReport.equipment_35_150.ps_35 = this.equipment35150Form.controls.ps_35.value;
    this.newReport.equipment_35_150.effect.tp_6_20 = this.equipment35150Form.controls.tp_6_20_effect_110_150.value;
    this.newReport.equipment_35_150.effect.population = this.equipment35150Form.controls.population_effect_110_150.value;
    this.newReport.equipment_35_150.effect.power = this.equipment35150Form.controls.power_effect_110_150.value;
    this.newReport.equipment_35_150.effect.szo = this.equipment35150Form.controls.szo_effect_110_150.value;
    this.newReport.equipment_network.lep_6_20 = this.equipmentNetworkForm.controls.lep_6_20.value;
    this.newReport.equipment_network.tp_6_20 = this.equipmentNetworkForm.controls.tp_6_20.value;
    this.newReport.equipment_network.effect.population = this.equipmentNetworkForm.controls.population_effect_network.value;
    this.newReport.equipment_network.effect.power = this.equipmentNetworkForm.controls.power_effect_network.value;
    this.newReport.equipment_network.effect.szo = this.equipmentNetworkForm.controls.szo_effect_network.value;
    this.newReport.resources.rise = this.resourcesForm.controls.resources_rise.value;
    this.newReport.resources.riseSumPower = this.resourcesForm.controls.resources_rise_sum_power.value;
    this.newReport.resources.risePeople = this.resourcesForm.controls.resources_rise_people.value;
    this.newReport.resources.brigades = this.resourcesForm.controls.resources_brigades.value;
    this.newReport.resources.people = this.resourcesForm.controls.resources_people.value;
    this.newReport.resources.technics = this.resourcesForm.controls.resources_technics.value;
    this.newReport.violations.total_6 = this.violationsForm.controls.violations_total_6.value;
    this.newReport.violations.uapv_35 = this.violationsForm.controls.violations_uapv_35.value;
    this.newReport.violations.napv_35 = this.violationsForm.controls.violations_napv_35.value;
    this.newReport.violations.power_off_35 = this.violationsForm.controls.violations_power_off_35.value;
    this.newReport.violations.lep_rs = this.violationsForm.controls.violations_lep_rs.value;
    this.newReport.violations.tn_cancel = this.violationsForm.controls.violations_tn_cancel.value;
    this.newReport.violations.from_6_04 = this.violationsForm.controls.violations_from_6_04.value;
    this.newReport.violations.power_off_04 = this.violationsForm.controls.violations_power_off_04.value;
    this.newReport.violations.greater_3_04 = this.violationsForm.controls.violations_greater_3_04.value;
    this.newReport.violations.population_srez_04 = this.violationsForm.controls.violations_population_srez_o4.value;
    this.newReport.violations.population_greater_3_04 = this.violationsForm.controls.violations_population_greater_3_04.value;
    this.store.dispatch(new AddReport(this.newReport));
  }
}
