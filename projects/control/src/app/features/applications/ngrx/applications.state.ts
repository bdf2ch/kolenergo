import { Application } from '../../../models';

/**
 * Интерфейс, описывающий состояние раздела с приложениями
 */
export interface IApplicationsState {
  applications: Application[];
  fetchingInProgress: boolean;            // Выполняется ли загрузка данных с сервера
}

/**
 * Начальное состояние разделас приложениями
 */
export const applicationsInitialState: IApplicationsState = {
  applications: [],
  fetchingInProgress: false
};
