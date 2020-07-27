import { Application } from '../../../models';

/**
 * Интерфейс, описывающий состояние раздела с приложениями
 */
export interface IApplicationsState {
  applications: Application[];
  selectedApplication: Application;
}

/**
 * Начальное состояние разделас приложениями
 */
export const applicationsInitialState: IApplicationsState = {
  applications: [],
  selectedApplication: null
};
