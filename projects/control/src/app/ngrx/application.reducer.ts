import { appInitialState, applicationInitialState, IApplicationState, IAppState} from './application.state';
import { ApplicationActions, EApplicationActions } from './application.actions';
import {IApplication} from "../interfaces";
import {Application} from "../models";

/**
 * Редуктор приложения
 * @param state - Сосотояние
 * @param action  -  Действие
 */
export function ApplicationReducer(
  state: IAppState = appInitialState,
  action: ApplicationActions
): IAppState {
  switch (action.type) {

    /**
     * Загрузка данных для инициализации приложения
     */
    case EApplicationActions.APPLICATION_LOAD_INITIAL_DATA: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка данных для инициализации приложения выполнена успешно
     */
    case EApplicationActions.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        applications: action.payload.data.applications.map((item: IApplication) => new Application(item))
      };
    }

    /**
     * Не удалось выполнить загрузку данных для инициализации приложения
     */
    case EApplicationActions.APPLICATION_LOAD_INITIAL_DATA_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
