import { User } from '../../models';

/**
 * Интерфейс, описывающий состояние текущей сессии
 */
export interface IAuthenticationState {
  user: User;                            // Пользователь
  isAuthenticationInProgress: boolean;   // Выполняется ли авторизация
}

/**
 * Начальное состояние текущей сессии
 */
export const AuthenticationInitialState: IAuthenticationState = {
  user: null,
  isAuthenticationInProgress: false
};
