import { IPhoneBookState, phoneBookInitialState } from './application.state';
import { PhoneBookActions, PhoneBookActionTypes } from './application.actions';
import { IPhoneBookDivision } from '../interfaces';
import { PhoneBookDivision } from '../models';

export function phoneBookReducer(
  state: IPhoneBookState = phoneBookInitialState,
  action: PhoneBookActions
): IPhoneBookState {
  switch (action.type) {

    case PhoneBookActionTypes.PHONE_BOOK_LOAD_INITIAL_DATA: {
      return {
        ...state,
        isFetchingInProgress: true
      };
    }

    case PhoneBookActionTypes.PHONE_BOOK_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isFetchingInProgress: false,
        companies: action.payload.data.companies.map((item: IPhoneBookDivision) => new PhoneBookDivision(item))
      };
    }

    case PhoneBookActionTypes.PHONE_BOOK_SET_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.payload
      };
    }

    case PhoneBookActionTypes.PHONE_BOOK_SET_APPLICATION_MODE: {
      return  {
        ...state,
        applicationMode: action.payload
      };
    }

    case PhoneBookActionTypes.PHONE_BOOK_SELECT_COMPANY: {
      return {
        ...state,
        selectedCompany: state.companies.find((company: PhoneBookDivision) => company.companyId === action.payload)
      };
    }

    case PhoneBookActionTypes.PHONE_BOOK_SHOW_SIDEBAR_TOGGLE_BUTTON: {
      return  {
        ...state,
        showSidebarToggleButton: true
      };
    }

    case PhoneBookActionTypes.PHONE_BOOK_HIDE_SIDEBAR_TOGGLE_BUTTON: {
      return  {
        ...state,
        showSidebarToggleButton: false
      };
    }
    default: {
      return state;
    }
  }
}
