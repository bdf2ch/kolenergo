import { Backup, Company, ICompany, User } from '@kolenergo/core';
import { WeatherSummary } from './weather-summary.model';
import { IWeatherSummary } from '../interfaces/weather-summary.interface';
// import { OperativeSituationConsumption } from './operative-situation-consumption.model';
import {IPeriod, IReport} from '../interfaces';
import {Consumption} from './consumption.model';
import {Period} from './period.model';

export class Report extends Backup {
  id: number;
  companyId: number;
  divisionId: number;
  periodId: number;
  // company: ICompany;
  user: User;
  periodDate: string;
  periodTime: string;
  dateCreated: number;
  dateCreatedD: Date;
  dateChanged: number;
  dateChangedD: Date;
  // consumption: number;
  consumption: Consumption;
  equipment_35_150: {
    lep_110_150: number,
    lep_35: number,
    ps_110_150: number,
    ps_35: number,
    effect: {
      tp_6_20: number,
      population: number,
      power: number,
      szo: number
    }
  };
  equipment_network: {
    lep_6_20: number;
    tp_6_20: number;
    effect: {
      population: number,
      power: number,
      szo: number
    }
  };
  total: {
    tp_6_20: number,
    population: number,
    power: number,
    szo: number,
  };
  weather: {
    min: number,
    max: number,
    wind: string,
    precipitations: string,
    rpg: boolean,
    orr: boolean
  };
  resources: {
    brigades: number,
    people: number,
    technics: number,
    rise: number,
    riseSumPower: number,
    risePeople: number
  };
  violations: {
    total_6: number,
    uapv_35: number,
    napv_35: number,
    power_off_35: number,
    lep_rs: number,
    tn_cancel: number,
    from_6_04: number,
    power_off_04: number,
    greater_3_04: number,
    population_srez_04: number,
    population_greater_3_04: number
  };
  backup?: any;
  weatherSummary: IWeatherSummary;

  /**
   * Конструктор
   * @param config - Параметры инициализаци
   */
  constructor(config?: IReport) {
    super();
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.divisionId = config ? config.divisionId : null;
    this.periodId = config ? config.periodId : null;
    this.user = config ? new User(config.user) : null;
    this.periodDate = config ? config.periodDate : null;
    this.periodTime = config ? config.periodTime : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? config.dateChanged : null;
    this.dateChangedD = config ? new Date(config.dateChanged) : null;
    // this.consumption = config ? config.consumption : 0;
    // this.consumption = config && config.consumption ? new OperativeSituationConsumption(config.consumption) : null;
    this.equipment_35_150 = {
      lep_110_150: config ? config.lep_110_150_count : 0,
      lep_35: config ? config.lep_35_count : 0,
      ps_110_150: config ? config.ps_110_150_count : 0,
      ps_35: config ? config.ps_35_count : 0,
      effect: {
        tp_6_20: config ? config.tp_6_20_count_effect_35_150 : 0,
        population: config ? config.population_count_effect_35_150 : 0,
        power: config ? (Math.round(config.power_effect_35_150 * 10) / 10) : 0,
        szo: config ? config.szo_count_effect_35_150 : 0
      }
    };
    this.equipment_network = {
      lep_6_20: config ? config.lep_6_20_count : 0,
      tp_6_20: config ? config.tp_6_20_count : 0,
      effect : {
        population: config ? config.population_count_effect_raspr : 0,
        power: config ? (Math.round(config.power_effect_raspr * 100) / 100) : 0,
        szo: config ? config.szo_count_effect_raspr : 0
      }
    };
    this.total = {
      tp_6_20: (config ? config.tp_6_20_count_effect_35_150 : 0) + (config ? config.tp_6_20_count : 0),
      population: (config ? config.population_count_effect_35_150 : 0) + (config ? config.population_count_effect_raspr : 0),
      power: (config ? (Math.round(config.power_effect_35_150 * 100) / 100) : 0) + (config ? (Math.round(config.power_effect_raspr * 100) / 100) : 0),
      szo: (config ? config.szo_count_effect_35_150 : 0) + (config ? config.szo_count_effect_raspr : 0)
    };
    this.weather = {
      min: config ? config.weatherMin : null,
      max: config ? config.weatherMax : null,
      wind: config ? config.weatherWind : null,
      precipitations: config ? config.weatherPrecipitations : null,
      rpg: config ? config.weatherRPG : false,
      orr: config ? config.weatherORR : false
    };
    this.resources = {
      brigades: config ? config.resourcesBrigades : 0,
      people: config ? config.resourcesPeople : 0,
      technics: config ? config.resourcesTechnics : 0,
      rise: config ? config.resourcesRiseCount : 0,
      riseSumPower: config ? config.resourcesRiseSumPower : 0,
      risePeople: config ? config.resourcesRisePeople : 0
    };
    this.violations = {
      total_6: config ? config.violations_6 : 0,
      uapv_35: config ? config.violations_35_uapv : 0,
      napv_35: config ? config.violations_35_napv : 0,
      power_off_35: config ? config.violations_35_power_off : 0,
      lep_rs: config ? config.violations_lep_rs : 0,
      tn_cancel: config ? config.violations_tn_cancel : 0,
      from_6_04: config ? config.violations_04_from_6 : 0,
      power_off_04: config ? config.violations_04_power_off : 0,
      greater_3_04: config ? config.violations_04_greater_3 : 0,
      population_srez_04: config ? config.violations_population_04_srez : 0,
      population_greater_3_04: config ? config.violations_population_04_greater_3 : 0
    };
    this.weatherSummary = config && config.weatherSummary ? new WeatherSummary(config.weatherSummary) : null;
  }

  getTotalEffect() {
    return {
      tp_6_20: this.equipment_35_150.effect.tp_6_20 + this.equipment_network.tp_6_20,
      population: this.equipment_35_150.effect.population + this.equipment_network.effect.population,
      power: Math.round((this.equipment_35_150.effect.power + this.equipment_network.effect.power) * 10) / 10,
      szo: this.equipment_35_150.effect.szo + this.equipment_network.effect.szo
    };
  }

  fromAnother(report: Report) {
    this.id = report.id;
    this.companyId = report.companyId;
    this.divisionId = report.divisionId;
    this.periodId = report.periodId;
    this.user = report.user;
    this.periodDate = report.periodDate;
    this.periodTime = report.periodTime;
    this.dateCreated = report.dateCreated;
    this.dateCreatedD = report.dateCreatedD;
    this.dateChanged = report.dateChanged;
    this.dateChangedD = report.dateChangedD;
    this.equipment_35_150.lep_110_150 = report.equipment_35_150.lep_110_150;
    this.equipment_35_150.lep_35 = report.equipment_35_150.lep_35;
    this.equipment_35_150.ps_110_150 = report.equipment_35_150.ps_110_150;
    this.equipment_35_150.ps_35 = report.equipment_35_150.ps_35;
    this.equipment_35_150.effect.tp_6_20 = report.equipment_35_150.effect.tp_6_20;
    this.equipment_35_150.effect.population = report.equipment_35_150.effect.population;
    this.equipment_35_150.effect.power = report.equipment_35_150.effect.power;
    this.equipment_35_150.effect.szo = report.equipment_35_150.effect.szo;
    this.equipment_network.lep_6_20 = report.equipment_network.lep_6_20;
    this.equipment_network.tp_6_20 = report.equipment_network.tp_6_20;
    this.equipment_network.effect.population = report.equipment_network.effect.population;
    this.equipment_network.effect.power = report.equipment_network.effect.power;
    this.equipment_network.effect.szo = report.equipment_network.effect.szo;
    this.total.tp_6_20 = report.total.tp_6_20;
    this.total.population = report.total.population;
    this.total.power = report.total.power;
    this.total.szo = report.total.szo;
    this.resources.brigades = report.resources.brigades;
    this.resources.people = report.resources.people;
    this.resources.technics = report.resources.technics;
    this.resources.rise = report.resources.rise;
    this.resources.riseSumPower = report.resources.riseSumPower;
    this.resources.risePeople = report.resources.risePeople;
    this.violations.total_6 = report.violations.total_6;
    this.violations.uapv_35 = report.violations.uapv_35;
    this.violations.napv_35 = report.violations.napv_35;
    this.violations.power_off_35 = report.violations.power_off_35;
    this.violations.lep_rs = report.violations.lep_rs;
    this.violations.tn_cancel = report.violations.tn_cancel;
    this.violations.from_6_04 = report.violations.from_6_04;
    this.violations.power_off_04 = report.violations.power_off_04;
    this.violations.greater_3_04 = report.violations.greater_3_04;
    this.violations.population_srez_04 = report.violations.population_srez_04;
    this.violations.population_greater_3_04 = report.violations.population_greater_3_04;
    this.weather.orr = report.weather.orr;
    this.weather.rpg = report.weather.rpg;
  }
}
