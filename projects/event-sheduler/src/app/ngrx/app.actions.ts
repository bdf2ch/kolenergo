import { Action } from '@ngrx/store';
import {IServerResponse} from '../../../../kolenergo-core/src/lib/interfaces';
import {IEventRequest, IEventShedulerInitialData} from '../event-sheduler/interfaces';
import {EventRequest} from '../event-sheduler/models';

/**
 * Типы действий в приложении
 */
export enum EventShedulerActionTypes {
  LOAD_INITIAL_DATA = '[ESA API] Load application initial data',
  LOAD_INITIAL_DATA_SUCCESS = '[ESA API] Application initial data loaded successfully',
  ADD_EVENT_REQUEST = '[ESA API] Add event request',
  ADD_EVENT_REQUEST_SUCCESS = '[ESA API] Event request added successfully'
}

/**
 * Загрузка данных для инициализации приложения
 */
export class LoadInitialData implements Action {
  readonly type = EventShedulerActionTypes.LOAD_INITIAL_DATA;

  constructor(public payload: number) {}
}

/**
 * Загрузка данных для инициализации приложения успешно завершена
 */
export class LoadInitialDataSuccess implements Action {
  readonly type = EventShedulerActionTypes.LOAD_INITIAL_DATA_SUCCESS;

  constructor(public payload: IServerResponse<IEventShedulerInitialData>) {}
}

/**
 * Добавление заявки на мероприятие
 */
export class AddEventRequest implements Action {
  readonly type = EventShedulerActionTypes.ADD_EVENT_REQUEST;

  constructor(public payload: EventRequest) {}
}

/**
 * Добавление заявки на мероприятие успешно завершено
 */
export class AddEventRequestSuccess implements Action {
  readonly type = EventShedulerActionTypes.ADD_EVENT_REQUEST_SUCCESS;

  constructor(public payload: IServerResponse<IEventRequest>) {}
}

export type EventShedulerActions = LoadInitialData | LoadInitialDataSuccess | AddEventRequest | AddEventRequestSuccess;

