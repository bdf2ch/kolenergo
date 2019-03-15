import {IUser} from '../../interfaces';

/**
 * Интерфейс, описывающий состояние текущей сессии
 */
export interface IAuthenticationState {
  user: IUser;    // Пользователь
}

/**
 * Начальное состояние текущей сессии
 */
export const authenticationInitialState: IAuthenticationState = {
  user: null
};
