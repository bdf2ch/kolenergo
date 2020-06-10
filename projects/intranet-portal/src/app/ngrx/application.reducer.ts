import { IPortalState, portalInitialState } from './application.state';
import { ApplicationActions, EApplicationActionTypes } from './application.actions';

/**
 * Редуктор состояния приложения
 * @param state - Состояние приложения
 * @param action - Действие
 */
export function portalReducer(
  state: IPortalState = portalInitialState,
  action: ApplicationActions
): IPortalState {
  switch (action.type) {

    case EApplicationActionTypes.APPLICATION_CHANGE_VIEW_MODE: {
      return {
        ...state,
      };
    }

    case EApplicationActionTypes.APPLICATION_OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: true
      };
    }

    case EApplicationActionTypes.APPLICATION_CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: false
      };
    }

    default: {
      return state;
    }
  }
}
