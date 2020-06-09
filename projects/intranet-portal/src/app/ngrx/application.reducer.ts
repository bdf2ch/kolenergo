import { IApplicationState } from './application.state';
import { ApplicationActions, EApplicationActionTypes } from './application.actions';


export function reducer(
  state: IApplicationState,
  action: ApplicationActions
): IApplicationState {
  switch (action.type) {
    case EApplicationActionTypes.APPLICATION_CHANGE_VIEW_MODE: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
