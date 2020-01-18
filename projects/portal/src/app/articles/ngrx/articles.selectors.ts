import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState } from '../../ngrx';
import { IArticlesState } from './';
import { ArticleSection } from '../models';

/**
 * Селектор дерева параметров раздела статей
 */
export const articles = createFeatureSelector<IApplicationState, IArticlesState>('articles');

/**
 * Селектор разделов статей
 */
export const selectSections = createSelector(
  articles,
  (state: IArticlesState) => state.sections
);

/**
 * Селектор раздела статей по идентификатору раздела
 */
export const selectSectionById = createSelector(
  selectSections,
  (sections, sectionId) => {
    return sections.filter((section: ArticleSection) => section.id === sectionId);
  }
);

/**
 * Селектор статей
 */
export const selectArticles = createSelector(
  articles,
  (state: IArticlesState) => state.articles
);

/**
 * Селектор текущей статьи
 */
export const selectSelectedArticle = createSelector(
  articles,
  (state: IArticlesState) => state.selectedArticle
);

/**
 * Селектор новой статьи
 */
export const selectNewArticle = createSelector(
  articles,
  (state: IArticlesState) => state.newArticle
);

/**
 * Селектор количества статей на старанице статей
 */
export const selectArticlesOnPage = createSelector(
  articles,
  (state: IArticlesState) => state.articlesOnPage
);

/**
 * Селектор состояния загрузки статей с сервера
 */
export const selectFetchingInProgress = createSelector(
  articles,
  (state: IArticlesState) => state.fetchingInProgress
);

/**
 * Селектор состояния добавления статьи
 */
export const selectAddingInProgress = createSelector(
  articles,
  (state: IArticlesState) => state.addingInProgress
);

/**
 * Селектор состояния сохраннения изменений в статье
 */
export const selectEditingInProgress = createSelector(
  articles,
  (state: IArticlesState) => state.editingInProgress
);

/**
 * Селектор состояния удаления статьи
 */
export const selectDeletingInProgress = createSelector(
  articles,
  (state: IArticlesState) => state.deletingInProgress
);

/**
 * Селектор состояния поиска статей
 */
export const selectSearchingInProgress = createSelector(
  articles,
  (state: IArticlesState) => state.searchingInProgress
);
