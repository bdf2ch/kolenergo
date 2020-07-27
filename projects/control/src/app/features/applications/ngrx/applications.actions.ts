import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IApplication } from '../../../interfaces';
import {Application} from '../../../models';

/**
 * Типы действий раздела приложений
 */
export enum ApplicationsActionTypes {
  LOAD_APPLICATIONS = '[Applications API] Load applications',
  LOAD_APPLICATIONS_SUCCESS = '[Applications API] Applications loaded successfully',
  SELECT_APPLICATION = '[Applications UI] Select application'
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
 * Выбор приложения
 */
export class ApplicationsSelectApplication implements Action {
  readonly type = ApplicationsActionTypes.SELECT_APPLICATION;
  constructor(public payload: Application) {}
}

/**
 * Действия раздела приложений
 */
export type ApplicationsActions =
  ApplicationsLoadApplications |
  ApplicationsLoadApplicationsSuccess |
  ApplicationsSelectApplication;
