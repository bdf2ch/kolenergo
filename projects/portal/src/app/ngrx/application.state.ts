import { IAuthenticationState } from 'kolenergo-core/lib/authentication/state/authentication.state';
import { Advert } from '../adverts/models';
import { IAdvertsState } from '../adverts/ngrx';

/**
 * Интерфейс, описывающий состояние портала
 */
export interface IPortalState {
  advertsOnStartPage: Advert[];         // Объявления на главной странице
  advertsOnStartPageCount: number;      // Количество объявлений на главной странице
  advertsPage: number;                  // Порядковый номер текущей страница объявлений
  totalAdvertsCount: number;            // Общее количество объявлений
  advertsIsFetching: boolean;           // Выполняется ли загрузка объявлений с сервера
}

/**
 * Начальное состояние портала
 */
export const portalInitialState: IPortalState = {
  advertsOnStartPage: [],
  advertsOnStartPageCount: 3,
  advertsPage: 0,
  totalAdvertsCount: 0,
  advertsIsFetching: false
};

/**
 * Интерфейс, описывающий состояние всего приложения
 */
export interface IApplicationState {
  portal: IPortalState;
  adverts: IAdvertsState;
  session: IAuthenticationState;
}
