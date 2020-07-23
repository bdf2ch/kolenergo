import { applicationsInitialState, IApplicationsState } from './applications.state';
import { ApplicationsActions, ApplicationsActionTypes } from './applications.actions';

export function reducer(
  state: IApplicationsState = applicationsInitialState,
  action: ApplicationsActions): IApplicationsState {
  switch (action.type) {
    case ApplicationsActionTypes.LOAD_APPLICATIONS: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}
