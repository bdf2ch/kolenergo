import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IApplication } from '../../../interfaces';
import { Application } from '../../../models';

/**
 * Типы действий раздела приложений
 */
export enum ApplicationsActionTypes {
  LOAD_APPLICATIONS = '[Applications API] Load applications',
  LOAD_APPLICATIONS_SUCCESS = '[Applications API] Applications loaded successfully',
  ADD_APPLICATION = '[Applications API] Add new application',
  ADD_APPLICATION_SUCCESS = '[Application API] New application added successfully',
  ADD_APPLICATION_FAIL = '[Applications API] Failed to add new application',
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
 * Добавление нового приложения
 */
export class ApplicationsAddApplication implements Action {
  readonly type = ApplicationsActionTypes.ADD_APPLICATION;
  constructor(public payload: Application) {}
}

/**
 * Новое приложение успешно добавлено
 */
export class ApplicationsAddApplicationSuccess implements Action {
  readonly type = ApplicationsActionTypes.ADD_APPLICATION_SUCCESS;
  constructor(public payload: IServerResponse<IApplication>) {}
}

/**
 * Не удалось добавить новое приложение
 */
export class ApplicationsAddApplicationFail implements Action {
  readonly type = ApplicationsActionTypes.ADD_APPLICATION_FAIL;
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
  ApplicationsAddApplication |
  ApplicationsAddApplicationSuccess |
  ApplicationsAddApplicationFail |
  ApplicationsSelectApplication;
