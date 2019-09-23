import { IAuthenticationState } from 'kolenergo-core/lib/authentication/state/authentication.state';
import { Advert } from '../adverts/models';
import { IAdvertsState } from '../adverts/ngrx';
import { IArticlesState } from '../articles/ngrx';
import { Article } from '../articles/models';

/**
 * Интерфейс, описывающий состояние портала
 */
export interface IPortalState {
  advertsOnStartPage: Advert[];             // Объявления на главной странице
  advertsOnStartPageCount: number;          // Количество объявлений на главной странице
  advertsPage: number;                      // Порядковый номер текущей страница объявлений
  totalAdvertsCount: number;                // Общее количество объявлений
  advertsIsFetching: boolean;               // Выполняется ли загрузка объявлений с сервера
  peopleArticlesOnStartPage: Article[];     // Статьи раздела "Наши люди" на главной странице
  peopleArticlesOnStartPageCount: number;   // Количество статей раздела "Наши люди" на главной странице
  peopleArticlesPage: number;               // Порядковый номер текущей страницы статей раздела "Наши люди"
  totalPeopleArticlesCount: number;         // Общее количество статей раздела "Наши люди"
  peopleArticlesIsFetching: boolean;        // Выполняется ли загрузка статей раздела "Наши люди" с сервера
}

/**
 * Начальное состояние портала
 */
export const portalInitialState: IPortalState = {
  advertsOnStartPage: [],
  advertsOnStartPageCount: 3,
  advertsPage: 0,
  totalAdvertsCount: 0,
  advertsIsFetching: false,
  peopleArticlesOnStartPage: [],
  peopleArticlesOnStartPageCount: 3,
  peopleArticlesPage: 0,
  totalPeopleArticlesCount: 0,
  peopleArticlesIsFetching: false
};

/**
 * Интерфейс, описывающий состояние всего приложения
 */
export interface IApplicationState {
  portal: IPortalState;
  adverts: IAdvertsState;
  articles: IArticlesState;
  session: IAuthenticationState;
}
