import { appInitialState, IAppState } from './application.state';
import { ApplicationActions, ApplicationActionTypes } from './application.actions';

/**
 * Редуктор состояния приложения
 * @param state - Состояние
 * @param action - Действие
 */
export function applicationReducer(
  state: IAppState = appInitialState,
  action: ApplicationActions): IAppState {
  switch (action.type) {

    /**
     * Загрузка данных для инициализации приложения
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка данных для инициализации приложения выполнена успешно
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        date: new Date(action.payload.data.date)
      };
    }

    /**
     * Не удалось выполнитть загрузку данных для инициализации приложения
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Выбор режима отображения заявок
     */
    case ApplicationActionTypes.APPLICATION_SELECT_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
