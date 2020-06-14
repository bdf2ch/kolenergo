import { IPortalState, portalInitialState } from './portal.state';
import { PortalActions, EPortalActionTypes } from './portal.actions';

/**
 * Редуктор состояния приложения
 * @param state - Состояние приложения
 * @param action - Действие
 */
export function portalReducer(
  state: IPortalState = portalInitialState,
  action: PortalActions
): IPortalState {
  switch (action.type) {

    case EPortalActionTypes.PORTAL_CHANGE_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.payload
      };
    }

    case EPortalActionTypes.PORTAL_OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: true
      };
    }

    case EPortalActionTypes.PORTAL_CLOSE_SIDEBAR: {
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
