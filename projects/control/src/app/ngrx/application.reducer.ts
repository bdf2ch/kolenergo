import {appInitialState, IAppState} from './application.state';
import {ApplicationActions, EApplicationActions} from './application.actions';
import {IApplication} from '../interfaces';
import {Application, MenuItem} from '../models';
import {ICompany} from '@kolenergo/core';
import {ApplicationsActions, ApplicationsActionTypes} from '../features/applications/ngrx/applications.actions';

/**
 * Редуктор приложения
 * @param state - Сосотояние
 * @param action  -  Действие
 */
export function ApplicationReducer(
  state: IAppState = appInitialState,
  action: ApplicationActions | ApplicationsActions
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
        applications: action.payload.data.applications.map((item: IApplication) => new Application(item)),
        menu: [
          new MenuItem(
            'Приложения',
            '/applications',
            [
              ...action.payload.data.applications.map((app: IApplication) => new MenuItem(app.title, `/applications/${app.id}`, []))
            ],
            'apps'
          ),
          new MenuItem(
            'Организации',
            '/companies',
            [
              ...action.payload.data.companies.map((com: ICompany) => new MenuItem(com.shortTitle, `/companies/${com.id}`, []))
            ],
            'business'
          ),
          new MenuItem(
            'Пользователи',
            '/users',
            [],
            'account_circle'
          )
        ]
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

    case EApplicationActions.APPLICATION_SET_BREADCRUMB: {
      return {
        ...state,
        breadcrumb: [...action.payload]
      };
    }

    /**
     * Добавление нового приложения
     */
    case ApplicationsActionTypes.ADD_APPLICATION: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Новое приложение успешно добавлено
     */
    case ApplicationsActionTypes.ADD_APPLICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    case ApplicationsActionTypes.ADD_APPLICATION_FAIL: {
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
