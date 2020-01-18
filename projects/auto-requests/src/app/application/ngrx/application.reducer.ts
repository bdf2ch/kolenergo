import { basicApplicationInitialState, IBasicApplicationState} from './application.state';
import { ApplicationActions, ApplicationActionTypes } from './application.actions';

export function reducer(
  state: IBasicApplicationState = basicApplicationInitialState,
  action: ApplicationActions): IBasicApplicationState {
  switch (action.type) {
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA: {
      return {
        ...state,
        isFetchingInProgress: true
      };
    }
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isInitialized: true,
        isFetchingInProgress: false
      };
    }
    default: {
      return state;
    }
  }
}
