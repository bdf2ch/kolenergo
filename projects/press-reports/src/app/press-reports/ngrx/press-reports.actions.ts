import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IPressReport } from '../interfaces';
import { PressReport } from '../models';

export enum PressReportsActionTypes {
  LOAD_REPORTS_BY_DATE = '[Press reports API] Load press reports by date',
  LOAD_REPORTS_BY_DATE_SUCCESS = '[Press Reports API] Press reports by date loaded successfully',
  ADD_REPORTS = '[Press reports API] Add press report',
  ADD_REPORTS_SUCCESS = '[Press reports API] Press report added successfully',
  EDIT_REPORT = '[Press reports API] Edit press report',
  EDIT_REPORT_SUCCESS = '[Press reports API] Press report saved successfully',
  DELETE_REPORTS_BY_DATE = '[Press reports API] Delete reports by date',
  DELETE_REPORTS_BY_DATE_SUCCESS = '[Press reports API] Press reports by date deleted successfully'
}

/**
 * Загрузка отчетов за указанную дату
 */
export class LoadReportsByDate implements Action {
  readonly type = PressReportsActionTypes.LOAD_REPORTS_BY_DATE;
  constructor(public payload: string) {}
}

/**
 * Загрузка отчетов за указанную дату успешно завершена
 */
export class LoadReportsByDateSuccess implements Action {
  readonly type = PressReportsActionTypes.LOAD_REPORTS_BY_DATE_SUCCESS;
  constructor(public payload: IServerResponse<IPressReport[]>) {}
}

/**
 * Добавление отчета о публикациях в СМИ
 */
export class AddReports implements Action {
  readonly type = PressReportsActionTypes.ADD_REPORTS;
  constructor(public payload: PressReport[]) {}
}

/**
 * Добавление отчета о публикациях в СМИ выполено успешно
 */
export class AddReportsSuccess implements Action {
  readonly type = PressReportsActionTypes.ADD_REPORTS_SUCCESS;
  constructor(public payload: IServerResponse<IPressReport[]>) {}
}

/**
 * Сохранение изменений в отчете о публикациях в СМИ
 */
export class EditReport implements Action {
  readonly type = PressReportsActionTypes.EDIT_REPORT;
  constructor(public payload: PressReport[]) {}
}

/**
 * Сохранение изменений в отчете о публикациях в СМИ выполенно успешно
 */
export class EditReportSuccess implements Action {
  readonly type = PressReportsActionTypes.EDIT_REPORT_SUCCESS;
  constructor(public payload: IServerResponse<IPressReport[]>) {}
}

/**
 * Удаление отчетов о публикациях в СМИ за указанную дату
 */
export class DeleteReportsByDate implements Action {
  readonly type = PressReportsActionTypes.DELETE_REPORTS_BY_DATE;
  constructor(public payload: string) {}
}

/**
 * Удаление отчетов о публикациях в СМИ за указанную дату выполнено успешно
 */
export class DeleteReportsByDateSuccess implements Action {
  readonly type = PressReportsActionTypes.DELETE_REPORTS_BY_DATE_SUCCESS;
  constructor(public payload: IServerResponse<boolean>) {}
}

export type PressReportsActions =
  LoadReportsByDate |
  LoadReportsByDateSuccess |
  AddReports |
  AddReportsSuccess |
  EditReport |
  EditReportSuccess |
  DeleteReportsByDate |
  DeleteReportsByDateSuccess;
