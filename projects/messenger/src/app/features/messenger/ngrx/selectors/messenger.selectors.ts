import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import { IMessengerState } from '../messenger.state';


/**
 * Селектор раздела с мессенджером
 */
export const selectMessenger = createFeatureSelector<IApplicationState, IMessengerState>('messenger');

/**
 * Селектор состояния инициализации приложения
 */
export const selectApplicationInitialized = createSelector(
  selectMessenger,
  (state: IMessengerState) => state.isApplicationInitialised
);


/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectLoadingInProgress = createSelector(
  selectMessenger,
  (state: IMessengerState) => state.isLoadingInProgress
);

/**
 * Селектор списка бесед
 */
export const selectChats = createSelector(
  selectMessenger,
  (state: IMessengerState) => state.chats
);

/**
 * Селектор списка отфильтрованных бесед
 */
export const selectFilteredChats = createSelector(
  selectMessenger,
  (state: IMessengerState) => state.filteredChats
);

/**
 * Селектор фильтра поиска беседы
 */
export const selectSearchChatQuery = createSelector(
  selectMessenger,
  (state: IMessengerState) => state.chatSearchQuery
);


/**
 * Селектор текущей беседы
 */
export const selectSelectedChat = createSelector(
  selectMessenger,
  (state: IMessengerState) => state.selectedChat
);
