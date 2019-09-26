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
 * Селектор состояния удаления объявления
 */
export const selectDeletingInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.deletingInProgress
);

/**
 * Селектор состояния поиска объявлений
 */
export const selectSearchingInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.searchingInProgress
);

/**
 * Селектор состояния загрузки изображения на сервер
 */
export const selectUploadingImageInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.uploadingImageInProgress
);

/**
 * Селектор состояния удаления изображения на сервере
 */
export const selectDeletingImageInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.deletingImageInProgress
);

/**
 * Селектор состояния загрузки вложения на сервер
 */
export const selectUploadingAttachmentInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.uploadingAttachmentInProgress
);

/**
 * Селектор состояния удаления вложения
 */
export const selectDeletingAttachmentInProgress = createSelector(
  adverts,
  (state: IAdvertsState) => state.deletingAttachmentInProgress
);


/**
 * Селектор количества объявлений на странице объявлений
 */
export const selectAdvertsOnPage = createSelector(
  adverts,
  (state: IAdvertsState) => state.advertsOnPage
);

/**
 * Селектор общего количества объявлений
 */
export const selectTotalAdverts = createSelector(
  adverts,
  (state: IAdvertsState) => state.totalAdverts
);

/**
 * Селектор порядкового номера текущей страницы
 */
export const selectPage = createSelector(
  adverts,
  (state: IAdvertsState) => state.page
);

/**
 * Селектор общего количества страниц с объявлениями
 */
export const selectTotalPages = createSelector(
  adverts,
  (state: IAdvertsState) => state.totalPages
);

/**
 * Селектор текущего объявления
 */
export const selectSelectedAdvert = createSelector(
  adverts,
  (state: IAdvertsState) => state.selectedAdvert
);

/**
 * Селектор нового объявления
 */
export const selectNewAdvert = createSelector(
  adverts,
  (state: IAdvertsState) => state.newAdvert
);

/**
 * Селектор строки поиска
 */
export const selectSearchQuery = createSelector(
  adverts,
  (state: IAdvertsState) => state.searchQuery
);


/**
 * Селектор объявлений
 */
export const selectAdverts = createSelector(
  adverts,
  (state: IAdvertsState) => state.adverts
);

/**
 * Селектор шаблонных объявлений
 */
export const selectTemplates = createSelector(
  adverts,
  (state: IAdvertsState) => state.templates
);
