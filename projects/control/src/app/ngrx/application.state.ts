import { applicationsInitialState, IApplicationsState } from '../applications/ngrx';

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  applications: IApplicationsState;       // Приложения

}

/**
 * Начальное состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  applications: applicationsInitialState,
};
