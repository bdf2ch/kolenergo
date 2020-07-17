import { Action } from '@ngrx/store';

import { IInitialData } from '../../../interfaces';

/**
 * Множество действий раздела управления заявками на облет
 */
export enum ESchedulerActions {
  SCHEDULER_GET_INITIAL_DATA = '[Scheduler API] Get application initial data',
  SCHEDULER_GET_INITIAL_DATA_SUCCESS = '[Scheduler API] Application initial data loaded successfully',
  SCHEDULER_GET_INITIAL_DATA_FAIL = '[Scheduler API] Failed to load application initial data'
}

/**
 * Получение данных для инициализации приложения
 */
export class SchedulerGetInitialData implements Action {
  readonly type = ESchedulerActions.SCHEDULER_GET_INITIAL_DATA;
}

/**
 * Данные для инициализации приложения успешно получены
 */
export class SchedulerGetInitialDataSuccess implements Action {
  readonly type = ESchedulerActions.SCHEDULER_GET_INITIAL_DATA_SUCCESS;
  constructor(public payload: IInitialData) {}
}

/**
 * Не удалось пролучить данные для инициализации приложения
 */
export class SchedulerGetInitialDataFail implements Action {
  readonly type = ESchedulerActions.SCHEDULER_GET_INITIAL_DATA_FAIL;
}

/**
 * Составной тип действий раздела упрвления заявками на облет
 */
export type SchedulerActions =
  SchedulerGetInitialData |
  SchedulerGetInitialDataSuccess |
  SchedulerGetInitialDataFail;
