import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IApplication } from '../../../interfaces';

/**
 * Типы действий раздела приложений
 */
export enum ApplicationsActionTypes {
  LOAD_APPLICATIONS = '[Applications API] Load applications',
  LOAD_APPLICATIONS_SUCCESS = '[Applications API] Applications loaded successfully'
}

/**
 * Загрузка списка приложений
 */
export class ApplicationsLoadApplications implements Action {
  readonly type = ApplicationsActionTypes.LOAD_APPLICATIONS;
}

/**
 * Загрузка списка приложений выполнена успешно
 */
export class ApplicationsLoadApplicationsSuccess implements Action {
  readonly type = ApplicationsActionTypes.LOAD_APPLICATIONS_SUCCESS;
  constructor(public payload: IServerResponse<IApplication[]>) {}
}

/**
 * Действия раздела приложений
 */
export type ApplicationsActions =
  ApplicationsLoadApplications |
  ApplicationsLoadApplicationsSuccess;
