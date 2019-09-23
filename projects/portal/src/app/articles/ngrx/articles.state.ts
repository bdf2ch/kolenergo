import {Article, ArticleSection} from '../models';

/**
 * Интерфейс, описывающий состояние раздела со статьями
 */
export interface IArticlesState {
  articles: Article[];
  sections: ArticleSection[];
  selectedArticle: Article;
  selectedSection: ArticleSection;
  newArticle: Article;
  articlesOnPage: number;
  totalArticles: number;
  page: number;
  totalPages: number;
  searchQuery: string;
  fetchingInProgress: boolean;
  addingInProgress: boolean;
  editingInProgress: boolean;
  deletingInProgress: boolean;
  searchingInProgress: boolean;
  uploadingImageInProgress: boolean;
  deletingImageInProgress: boolean;
  uploadingAttachmentInProgress: boolean;
  deletingAttachmentInProgress: boolean;
}

/**
 * Начальное состояние раздела со статьями
 */
export const articlesInitialState: IArticlesState = {
  articles: [],
  sections: [],
  selectedArticle: null,
  selectedSection: null,
  newArticle: new Article(),
  articlesOnPage: 10,
  totalArticles: 0,
  page: 0,
  totalPages: 0,
  searchQuery: null,
  fetchingInProgress: false,
  addingInProgress: false,
  editingInProgress: false,
  deletingInProgress: false,
  searchingInProgress: false,
  uploadingImageInProgress: false,
  deletingImageInProgress: false,
  uploadingAttachmentInProgress: false,
  deletingAttachmentInProgress: false
};

