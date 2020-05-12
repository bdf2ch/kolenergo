import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { User } from '@kolenergo/core';
import { IDivision, IPeriod } from '../../../../interfaces';
import { Report } from '../../../../models';
import { IApplicationState } from '../../../../ngrx';
import {
  selectLoadingInProgress,
  selectSelectedDivision,
  selectSelectedPeriod, selectSelectedReport,
  selectUser
} from '../../ngrx/selectors';
import {AddReport, EditReport} from '../../ngrx';

@Component({
  selector: 'app-report-edit-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.less']
})
export class ReportEditDialogComponent implements OnInit {
  private user$: Observable<User>;
  private selectedDivision$: Observable<IDivision>;
  public selectedPeriod$: Observable<IPeriod>;
  public isLoadingInProgress$: Observable<boolean>;
  public selectedReport$: Observable<Report>;
  private user: User;
  private selectedDivision: IDivision;
  private selectedPeriod: IPeriod;
  private selectedReport: Report;
  public equipment35150Form: FormGroup;
  public equipmentNetworkForm: FormGroup;
  public resourcesForm: FormGroup;
  public violationsForm: FormGroup;
  public weatherForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {}

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
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
    this.selectedReport$.subscribe((value: Report) => {
      if (value) {
        this.selectedReport = value;
      }
    });
    this.isLoadingInProgress$ = this.store.pipe(select(selectLoadingInProgress));
    this.isLoadingInProgress$.subscribe((value: boolean) => {
      if (this.equipment35150Form) {
        if (value === true) {
          this.equipment35150Form.disable();
        } else {
          this.equipment35150Form.enable();
        }
      }
      if (this.equipmentNetworkForm) {
        if (value === true) {
          this.equipmentNetworkForm.disable();
        } else {
          this.equipmentNetworkForm.enable();
        }
      }
      if (this.resourcesForm) {
        if (value === true) {
          this.resourcesForm.disable();
        } else {
          this.resourcesForm.enable();
        }
      }
      if (this.violationsForm) {
        if (value === true) {
          this.violationsForm.disable();
        } else {
          this.violationsForm.enable();
        }
      }
      if (this.weatherForm) {
        if (value === true) {
          this.weatherForm.disable();
        } else {
          this.weatherForm.enable();
        }
      }
    });
    this.equipment35150Form = this.builder.group({
      lep_110_150: new FormControl(0, Validators.required),
      lep_35: new FormControl(0, Validators.required),
      ps_110_150: new FormControl(0, Validators.required),
      ps_35: new FormControl(0, Validators.required),
      tp_6_20_effect_110_150: new FormControl(0, Validators.required),
      population_effect_110_150: new FormControl(0, Validators.required),
      power_effect_110_150: new FormControl(0, Validators.required),
      szo_effect_110_150: new FormControl(0, Validators.required)
    });
    this.equipmentNetworkForm = this.builder.group({
      lep_6_20: new FormControl(0, Validators.required),
      tp_6_20: new FormControl(0, Validators.required),
      population_effect_network: new FormControl(0, Validators.required),
      power_effect_network: new FormControl(0, Validators.required),
      szo_effect_network: new FormControl(0, Validators.required)
    });
    this.resourcesForm = this.builder.group({
      resources_rise: new FormControl(0, Validators.required),
      resources_rise_sum_power: new FormControl(0, Validators.required),
      resources_rise_people: new FormControl(0, Validators.required),
      resources_brigades: new FormControl(0, Validators.required),
      resources_people: new FormControl(0, Validators.required),
      resources_technics: new FormControl(0, Validators.required),
    });
    this.violationsForm = this.builder.group({
      violations_total_6: new FormControl(0, Validators.required),
      violations_uapv_35: new FormControl(0, Validators.required),
      violations_napv_35: new FormControl(0, Validators.required),
      violations_power_off_35: new FormControl(0, Validators.required),
      violations_lep_rs: new FormControl(0, Validators.required),
      violations_tn_cancel: new FormControl(0, Validators.required),
      violations_from_6_04: new FormControl(0, Validators.required),
      violations_power_off_04: new FormControl(0, Validators.required),
      violations_greater_3_04: new FormControl(0, Validators.required),
      violations_population_srez_o4: new FormControl(0, Validators.required),
      violations_population_greater_3_04: new FormControl(0, Validators.required),
    });
    this.weatherForm = this.builder.group({
      orr: new FormControl(false),
      rpg: new FormControl(false)
    });

    this.weatherForm.controls.orr.valueChanges.subscribe((value: boolean) => {
      this.weatherForm.controls.rpg.setValue(value ? false : false, {emitEvent: false});
    });

    this.weatherForm.controls.rpg.valueChanges.subscribe((value: boolean) => {
      this.weatherForm.controls.orr.setValue(value ? false : false, {emitEvent: false});
    });

    this.selectedReport$.subscribe((report: Report) => {
      if (report) {
        console.log(report);
        this.equipment35150Form.controls.lep_110_150.setValue(report.equipment_35_150.lep_110_150);
        this.equipment35150Form.controls.lep_35.setValue(report.equipment_35_150.lep_35);
        this.equipment35150Form.controls.ps_110_150.setValue(report.equipment_35_150.ps_110_150);
        this.equipment35150Form.controls.ps_35.setValue(report.equipment_35_150.ps_35);
        this.equipment35150Form.controls.tp_6_20_effect_110_150.setValue(report.equipment_35_150.effect.tp_6_20);
        this.equipment35150Form.controls.population_effect_110_150.setValue(report.equipment_35_150.effect.population);
        this.equipment35150Form.controls.power_effect_110_150.setValue(report.equipment_35_150.effect.power);
        this.equipment35150Form.controls.szo_effect_110_150.setValue(report.equipment_35_150.effect.szo);
        this.equipmentNetworkForm.controls.lep_6_20.setValue(report.equipment_network.lep_6_20);
        this.equipmentNetworkForm.controls.tp_6_20.setValue(report.equipment_network.tp_6_20);
        this.equipmentNetworkForm.controls.population_effect_network.setValue(report.equipment_network.effect.population);
        this.equipmentNetworkForm.controls.power_effect_network.setValue(report.equipment_network.effect.power);
        this.equipmentNetworkForm.controls.szo_effect_network.setValue(report.equipment_network.effect.szo);
        this.resourcesForm.controls.resources_rise.setValue(report.resources.rise);
        this.resourcesForm.controls.resources_rise_sum_power.setValue(report.resources.riseSumPower);
        this.resourcesForm.controls.resources_rise_people.setValue(report.resources.risePeople);
        this.resourcesForm.controls.resources_brigades.setValue(report.resources.brigades);
        this.resourcesForm.controls.resources_people.setValue(report.resources.people);
        this.resourcesForm.controls.resources_technics.setValue(report.resources.technics);
        this.violationsForm.controls.violations_total_6.setValue(report.violations.total_6);
        this.violationsForm.controls.violations_uapv_35.setValue(report.violations.uapv_35);
        this.violationsForm.controls.violations_napv_35.setValue(report.violations.napv_35);
        this.violationsForm.controls.violations_power_off_35.setValue(report.violations.power_off_35);
        this.violationsForm.controls.violations_lep_rs.setValue(report.violations.lep_rs);
        this.violationsForm.controls.violations_tn_cancel.setValue(report.violations.tn_cancel);
        this.violationsForm.controls.violations_from_6_04.setValue(report.violations.from_6_04);
        this.violationsForm.controls.violations_power_off_04.setValue(report.violations.power_off_04);
        this.violationsForm.controls.violations_greater_3_04.setValue(report.violations.greater_3_04);
        this.violationsForm.controls.violations_population_srez_o4.setValue(report.violations.population_srez_04);
        this.violationsForm.controls.violations_population_greater_3_04.setValue(report.violations.population_greater_3_04);
        this.weatherForm.controls.orr.setValue(report.weather.orr);
        this.weatherForm.controls.rpg.setValue(report.weather.rpg);
      }
    });

  }

  /**
   * Добавление отчета об оперативной обстановке
   */
  saveChanges() {
    const report = new Report();
    // this.newReport.user = this.user;
    report.id = this.selectedReport.id;
    report.companyId = this.selectedDivision.companyId;
    report.divisionId = this.selectedDivision.id;
    // this.newReport.periodId = this.selectedPeriod.id;
    report.periodTime = this.selectedPeriod.time;
    report.equipment_35_150.lep_110_150 = this.equipment35150Form.controls.lep_110_150.value;
    report.equipment_35_150.lep_35 = this.equipment35150Form.controls.lep_35.value;
    report.equipment_35_150.ps_110_150 = this.equipment35150Form.controls.ps_110_150.value;
    report.equipment_35_150.ps_35 = this.equipment35150Form.controls.ps_35.value;
    report.equipment_35_150.effect.tp_6_20 = this.equipment35150Form.controls.tp_6_20_effect_110_150.value;
    report.equipment_35_150.effect.population = this.equipment35150Form.controls.population_effect_110_150.value;
    report.equipment_35_150.effect.power = this.equipment35150Form.controls.power_effect_110_150.value;
    report.equipment_35_150.effect.szo = this.equipment35150Form.controls.szo_effect_110_150.value;
    report.equipment_network.lep_6_20 = this.equipmentNetworkForm.controls.lep_6_20.value;
    report.equipment_network.tp_6_20 = this.equipmentNetworkForm.controls.tp_6_20.value;
    report.equipment_network.effect.population = this.equipmentNetworkForm.controls.population_effect_network.value;
    report.equipment_network.effect.power = this.equipmentNetworkForm.controls.power_effect_network.value;
    report.equipment_network.effect.szo = this.equipmentNetworkForm.controls.szo_effect_network.value;
    report.resources.rise = this.resourcesForm.controls.resources_rise.value;
    report.resources.riseSumPower = this.resourcesForm.controls.resources_rise_sum_power.value;
    report.resources.risePeople = this.resourcesForm.controls.resources_rise_people.value;
    report.resources.brigades = this.resourcesForm.controls.resources_brigades.value;
    report.resources.people = this.resourcesForm.controls.resources_people.value;
    report.resources.technics = this.resourcesForm.controls.resources_technics.value;
    report.violations.total_6 = this.violationsForm.controls.violations_total_6.value;
    report.violations.uapv_35 = this.violationsForm.controls.violations_uapv_35.value;
    report.violations.napv_35 = this.violationsForm.controls.violations_napv_35.value;
    report.violations.power_off_35 = this.violationsForm.controls.violations_power_off_35.value;
    report.violations.lep_rs = this.violationsForm.controls.violations_lep_rs.value;
    report.violations.tn_cancel = this.violationsForm.controls.violations_tn_cancel.value;
    report.violations.from_6_04 = this.violationsForm.controls.violations_from_6_04.value;
    report.violations.power_off_04 = this.violationsForm.controls.violations_power_off_04.value;
    report.violations.greater_3_04 = this.violationsForm.controls.violations_greater_3_04.value;
    report.violations.population_srez_04 = this.violationsForm.controls.violations_population_srez_o4.value;
    report.violations.population_greater_3_04 = this.violationsForm.controls.violations_population_greater_3_04.value;
    report.weather.orr = this.weatherForm.controls.orr.value;
    report.weather.rpg = this.weatherForm.controls.rpg.value;
    this.store.dispatch(new EditReport(report));
  }

}
