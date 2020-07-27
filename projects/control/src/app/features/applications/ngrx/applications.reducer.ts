import { applicationsInitialState, IApplicationsState } from './applications.state';
import { ApplicationsActions, ApplicationsActionTypes } from './applications.actions';

export function reducer(
  state: IApplicationsState = applicationsInitialState,
  action: ApplicationsActions): IApplicationsState {
  switch (action.type) {

    /**
     * Загрузка списка приложений
     */
    case ApplicationsActionTypes.LOAD_APPLICATIONS: {
      return {
        ...state
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
