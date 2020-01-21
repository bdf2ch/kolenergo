import { Action } from '@ngrx/store';

import {ICompany, IServerResponse} from '@kolenergo/core';
import {IAppInitData, IDivision, IPeriod} from '../../../interfaces';

/**
 * Типы действий в разделе отчетов по оперативной обстановке
 */
export enum OperativeSituationActionTypes {
  NAVIGATE_TO_SIGN_IN_PAGE = '[Application] Open sign in page',
  LOAD_INITIAL_DATA = '[OSR API] Load application initial data',
  LOAD_INITIAL_DATA_SUCCESS = '[OSR API] Application initial data loaded successfully',
  LOAD_INITIAL_DATA_FAIL = '[OSR API] Failed to load application initial data',
  SELECT_COMPANY = '[Application] Select current company',
  SELECT_DIVISION = '[Application] Select current division',
  SELECT_PERIOD = '[Application] Select time period'
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
 * Действия в разделе отчетов по оперативной обстановке
 */
export type OperativeSituationActions =
  NavigateToSignInPage |
  LoadInitialData |
  LoadInitialDataSuccess |
  LoadInitialDataFail |
  SelectCompany |
  SelectDivision |
  SelectPeriod;
