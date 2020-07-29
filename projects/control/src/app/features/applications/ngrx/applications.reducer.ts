import {applicationsInitialState, IApplicationsState} from './applications.state';
import {ApplicationsActions, ApplicationsActionTypes} from './applications.actions';
import {Application} from '../../../models';
import {ApplicationActions, EApplicationActions} from '../../../ngrx/application.actions';
import {IApplication} from '../../../interfaces';

export function reducer(
  state: IApplicationsState = applicationsInitialState,
  action: ApplicationsActions | ApplicationActions): IApplicationsState {
  switch (action.type) {

    /**
     * Данные для инициализации приложения успешно загружены
     */
    case EApplicationActions.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        applications: action.payload.data.applications.map((item: IApplication) => new Application(item))
      };
    }

    /**
     * Загрузка списка приложений
     */
    case ApplicationsActionTypes.LOAD_APPLICATIONS: {
      return {
        ...state
      };
    }

    /**
     * Добавление нового приложения
     */
    case ApplicationsActionTypes.ADD_APPLICATION: {
      return {
        ...state
      };
    }

    /**
     * Приложение успешно добавлено
     */
    case ApplicationsActionTypes.ADD_APPLICATION_SUCCESS: {
      return {
        ...state,
        applications: [...state.applications, new Application(action.payload.data)]
      };
    }

    /**
     * Выбор приложения
     */
    case ApplicationsActionTypes.SELECT_APPLICATION : {
      return {
        ...state,
        selectedApplication: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
