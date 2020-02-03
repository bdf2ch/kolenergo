import { Action } from '@ngrx/store';

import { ICompany, IServerResponse } from '@kolenergo/core';
import {IAppInitData, IDivision, IPeriod, IReport, IReportSummary} from '../../../interfaces';
import { Report } from '../../../models';

/**
 * Типы действий в разделе отчетов по оперативной обстановке
 */
export enum OperativeSituationActionTypes {
  NAVIGATE_TO_SIGN_IN_PAGE = '[Application] Open sign in page',
  LOAD_INITIAL_DATA = '[OSR API] Load application initial data',
  LOAD_INITIAL_DATA_SUCCESS = '[OSR API] Application initial data loaded successfully',
  LOAD_INITIAL_DATA_FAIL = '[OSR API] Failed to load application initial data',
  LOAD_REPORTS_BY_DIVISION = '[OSR API] Load reports by division',
  LOAD_REPORTS_BY_DIVISION_SUCCESS = '[OSR API] Reports by division loaded successfully',
  LOAD_REPORTS_BY_DIVISION_FAIL = '[OSR API] Failed to load reports by division',
  LOAD_REPORTS_BY_COMPANY = '[OSR API] Load reports by company',
  LOAD_REPORTS_BY_COMPANY_SUCCESS = '[OSR API] Reports by company loaded successfully',
  LOAD_REPORTS_BY_COMPANY_FAIL = '[OSR API] Failed to load reports by company',
  ADD_REPORT = '[OSR API] Add report',
  ADD_REPORT_SUCCESS = '[OSR API] Report added successfully',
  ADD_REPORT_FAIL = '[OSR API] Failed to add report',
  SELECT_COMPANY = '[Application] Select current company',
  SELECT_DIVISION = '[Application] Select current division',
  SELECT_PERIOD = '[Application] Select time period',
  SELECT_REPORT = '[Application] Select report'
}

/**
 * Переход на страницу авторизации
 */
export class NavigateToSignInPage implements Action {
  readonly type = OperativeSituationActionTypes.NAVIGATE_TO_SIGN_IN_PAGE;
}

/**
 * Загрузка данных для инициализации приложения
 */
export class LoadInitialData implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных для инициализации приложения выполнена успешно
 */
export class LoadInitialDataSuccess implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IAppInitData>) {}
}

/**
 * Загрузка данных для инициализации приложения не выполнена
 */
export class LoadInitialDataFail implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_INITIAL_DATA_FAIL;
}

/**
 * Загрузка сводки отчетов об оперативной обстановке по структурному подразделению
 */
export class LoadReportsByDivision implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION;
}

/**
 * Загрузка сводки отчетов об оперативной обстановке по структурному подразделению выполенна успешно
 */
export class LoadReportsByDivisionSuccess implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION_SUCCESS;
  constructor(public payload: IServerResponse<IReportSummary>) {}
}

/**
 * Загрузка сводки отчетов об оперативной обстановке по структурному подразделению не выполнена
 */
export class LoadReportsByDivisionFail implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION_FAIL;
}

/**
 * Загрузка сводки отчетов по оперативной обстановке по организации
 */
export class LoadReportsByCompany implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY;
}

/**
 * Загрузка сводки отчетов по оперативной обстановке по организации выполнена успешно
 */
export class LoadReportsByCompanySuccess implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY_SUCCESS;
  constructor(public payload: IServerResponse<IReportSummary>) {}
}

/**
 * Загрузка сводки отчетов по оперативной обстановке по организации не выполнена
 */
export class LoadReportsByCompanyFail implements Action {
  readonly type = OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY_FAIL;
}

/**
 * Добавление отчета об оперативной обстановке
 */
export class AddReport implements Action {
  readonly type = OperativeSituationActionTypes.ADD_REPORT;
  constructor(public payload: Report) {}
}

/**
 * Добавление отчета об оперативной обстановке выполенна успешно
 */
export class AddReportSuccess implements Action {
  readonly type = OperativeSituationActionTypes.ADD_REPORT_SUCCESS;
  constructor(public payload: IServerResponse<IReportSummary>) {}
}

/**
 * Добавление отчета об оперативной обстановке не выполнена
 */
export class AddReportFail implements Action {
  readonly type = OperativeSituationActionTypes.ADD_REPORT_FAIL;
}

/**
 * Выбор текущей организации
 */
export class SelectCompany implements Action {
  readonly type = OperativeSituationActionTypes.SELECT_COMPANY;
  constructor(public payload: ICompany) {}
}

/**
 * Выбор текущего структурного подразделения
 */
export class SelectDivision implements Action {
  readonly type = OperativeSituationActionTypes.SELECT_DIVISION;
  constructor(public payload: IDivision) {}
}

/**
 * Выбор текущего временного периода
 */
export class SelectPeriod implements Action {
  readonly type = OperativeSituationActionTypes.SELECT_PERIOD;
  constructor(public payload: IPeriod) {}
}

/**
 * Выбор текущего отчета
 */
export class SelectReport implements Action {
  readonly type = OperativeSituationActionTypes.SELECT_REPORT;
  constructor(public payload: Report) {}
}

/**
 * Действия в разделе отчетов по оперативной обстановке
 */
export type OperativeSituationActions =
  NavigateToSignInPage |
  LoadInitialData |
  LoadInitialDataSuccess |
  LoadInitialDataFail |
  LoadReportsByDivision |
  LoadReportsByDivisionSuccess |
  LoadReportsByDivisionFail |
  LoadReportsByCompany |
  LoadReportsByCompanySuccess |
  LoadReportsByCompanyFail |
  AddReport |
  AddReportSuccess |
  AddReportFail |
  SelectCompany |
  SelectDivision |
  SelectPeriod |
  SelectReport;
