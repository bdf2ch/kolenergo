import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import {IApplicationInitialData, IChat, IMessage} from '../../../interfaces';
import { Chat } from '../../../models';

export enum MessengerActionTypes {
  LOAD_INITIAL_DATA = '[MSG API] Load application initial data',
  LOAD_INITIAL_DATA_SUCCESS = '[MSG API] Application initial data loaded successfully',
  LOAD_INITIAL_DATA_FAIL = '[MSG API] Failed to load application initial data',
  SEARCH_CHAT_QUERY_CHANGED = '[Application] Chat search query has been changed',
  SEARCH_CHAT_QUERY_CLEARED = '[Application] Chat search query has been cleared',
  SELECT_CHAT = '[Application] Select chat',
  LOAD_CHAT = '[MSG API] Load chat',
  LOAD_CHAT_SUCCESS = '[MSG API] Chat loaded successfully',
  LOAD_CHAT_FAIL = '[MSG API] Failed to load chat'
}

/**
 * Загрузка данных для инициализации приложения
 */
export class LoadInitialData implements Action {
  readonly type = MessengerActionTypes.LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных для инициализации приложения выполнена успешно
 */
export class LoadInitialDataSuccess implements Action {
  readonly type = MessengerActionTypes.LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IApplicationInitialData>) {}
}

/**
 * Загрузка данных для инициализации приложения не выполнена
 */
export class LoadInitialDataFail implements Action {
  readonly type = MessengerActionTypes.LOAD_INITIAL_DATA_FAIL;
}

/**
 * Изменение фильтра поиска беседы
 */
export class SearchChatQueryChanged implements Action {
  readonly type = MessengerActionTypes.SEARCH_CHAT_QUERY_CHANGED;
  constructor(public payload: string) {}
}

/**
 * Очистка фильтра поиска беседы
 */
export class SearchChatQueryCleared implements Action {
  readonly type = MessengerActionTypes.SEARCH_CHAT_QUERY_CLEARED;
}

/**
 * Выбор текущей беседы
 */
export class SelectChat implements Action {
  readonly type = MessengerActionTypes.SELECT_CHAT;
  constructor(public payload: Chat) {}
}

/**
 * Загрузка сообщений беседы
 */
export class LoadChat implements Action {
  readonly type = MessengerActionTypes.LOAD_CHAT;
}

/**
 * Загрузка сообщений беседы выполнена успешно
 */
export class LoadChatSuccess implements Action {
  readonly type = MessengerActionTypes.LOAD_CHAT_SUCCESS;
  constructor(public payload: IServerResponse<IMessage[]>) {}
}

/**
 * Не удалось выполнить загрузку сообщений беседы
 */
export class LoadChatFail implements Action {
  readonly type = MessengerActionTypes.LOAD_CHAT_FAIL;
}

/**
 * Тип, аккумулирующий все действия мессенджера
 */
export type MessengerActions =
  LoadInitialData |
  LoadInitialDataSuccess |
  LoadInitialDataFail |
  SearchChatQueryChanged |
  SearchChatQueryCleared |
  SelectChat |
  LoadChat |
  LoadChatSuccess |
  LoadChatFail;
