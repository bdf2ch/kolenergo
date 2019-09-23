import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { ArticleSection } from '../models';
import { IArticle } from '../interfaces';

/**
 * Типы действий со статьями
 */
export enum ArticlesActionTypes {
  ARTICLES_LOAD_ARTICLES = '[Articles API] Load list of articles',
  ARTICLES_LOAD_ARTICLES_SUCCESS = '[Articles API] List of articles loaded successfully',
  ARTICLES_LOAD_ARTICLE = '[Articles API] Load article',
  ARTICLES_LOAD_ARTICLE_SUCCESS = '[Articles API] Article loaded successfully',
  ARTICLES_LOAD_ARTICLES_NEXT_PAGE = '[Articles API] Load articles next page',
  ARTICLES_LOAD_ARTICLES_NEXT_PAGE_SUCCESS = '[Articles API] Next page of articles loaded successfully',
  ARTICLES_SEARCH_ARTICLES = '[Articles API] Search articles',
  ARTICLES_SEARCH_ARTICLES_SUCCESS = '[Articles API] Articles search completed successfully',
  ARTICLES_CLEAR_SEARCH = '[Articles list page] Clear articles search'
}

/**
 * Загрузка списка статей
 */
export class ArticlesLoadArticles implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_LOAD_ARTICLES;
  constructor(public payload: ArticleSection) {}
}

/**
 * Загрузка списка статей выполнена успешно
 */
export class ArticlesLoadArticlesSuccess implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_LOAD_ARTICLES_SUCCESS;
  constructor(public payload: IServerResponse<any>) {}
}

/**
 * Загрузка статьи
 */
export class ArticlesLoadArticle implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_LOAD_ARTICLE;
  constructor(public payload: number) {}
}

/**
 * Загрузка статьи выполнена успешно
 */
export class ArticlesLoadArticleSuccess implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_LOAD_ARTICLE_SUCCESS;
  constructor(public payload: IServerResponse<IArticle>) {}
}

/**
 * Загрузка следующей страницы со статьями
 */
export class ArticlesLoadArticlesNextPage implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_LOAD_ARTICLES_NEXT_PAGE;
}

/**
 * Загрузка следующей страницы со статьями выполнена успешно
 */
export class ArticlesLoadArticlesNextPageSuccess implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_LOAD_ARTICLES_NEXT_PAGE_SUCCESS;
  constructor(public payload: IServerResponse<IArticle[]>) {}
}

/**
 * Поиск статей
 */
export class ArticlesSearchArticles implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_SEARCH_ARTICLES;
  constructor(public payload: string) {}
}

/**
 * Поиск статей выполнен успешно
 */
export class ArticlesSearchArticlesSuccess implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_SEARCH_ARTICLES_SUCCESS;
  constructor(public payload: IServerResponse<IArticle[]>) {}
}

/**
 * Очистка результатов поиска
 */
export class ArticlesClearSearch implements Action {
  readonly type = ArticlesActionTypes.ARTICLES_CLEAR_SEARCH;
}

export type articlesActions =
  ArticlesLoadArticles |
  ArticlesLoadArticlesSuccess |
  ArticlesLoadArticle |
  ArticlesLoadArticleSuccess |
  ArticlesLoadArticlesNextPage |
  ArticlesLoadArticlesNextPageSuccess |
  ArticlesSearchArticles |
  ArticlesSearchArticlesSuccess |
  ArticlesClearSearch;
