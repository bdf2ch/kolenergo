import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState } from '../../ngrx';
import { IAdvertsState } from './adverts.state';

/**
 * Селектор дерева параметров портала
 */
export const adverts = createFeatureSelector<IApplicationState, IAdvertsState>('adverts');

/**
 * Селектор состояния загрузки объявлений с сервера
 */
export const selectFetchingInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.fetchingInProgress
);

/**
 * Селектор состояния добавления объявления
 */
export const selectAddingInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.addingInProgress
);

/**
 * Селектор состояния сохранения измененного объявления
 */
export const selectEditingInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.editingInProgress
);

/**
 * Селектор состояния загрузки вложения на сервер
 */
export const selectUploadingAttachmentInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.uploadingAttachmentInProgress
);


/**
 * Селектор количества объявлений на странице объявлений
 */
export const selectAdvertsOnPage = createSelector(
  adverts,
  (state: IAdvertsState) => state.advertsOnPage
);

/**
 * Селектор порядкового номера текущей страницы
 */
export const selectPage = createSelector(
  adverts,
  (state: IAdvertsState) => state.page
);

/**
 * Селектор нового объявления
 */
export const selectNewAdvert = createSelector(
  adverts,
  (state: IAdvertsState) => state.newAdvert
);

/**
 * Селектор объявлений
 */
export const selectAdverts = createSelector(
  adverts,
  (state: IAdvertsState) => state.adverts
);
