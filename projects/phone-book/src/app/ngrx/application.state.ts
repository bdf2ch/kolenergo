import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { PhoneBookDivision } from '../models';
import {EApplicationMode, EViewMode} from '../enums';

/**
 * Интерфейс, описывающий состояние справочника
 */
export interface IPhoneBookState {
  isFetchingInProgress: boolean;
  isSearchingInProgress: boolean;
  viewMode: EViewMode;
  applicationMode: EApplicationMode;
  showSidebarToggleButton: boolean;
  companies: PhoneBookDivision[];
  divisions: PhoneBookDivision[];
  selectedCompany: PhoneBookDivision;
}

/**
 * Начальное стсотояние справочника
 */
export const phoneBookInitialState: IPhoneBookState = {
  isFetchingInProgress: false,
  isSearchingInProgress: false,
  viewMode: EViewMode.DESKTOP_VIEW,
  applicationMode: EApplicationMode.APPLICATION_MODE_CONTACT_LIST,
  showSidebarToggleButton: false,
  companies: [],
  divisions: [],
  selectedCompany: null
};

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  phoneBook: IPhoneBookState;
  session: IAuthenticationState;
}

/**
 * Начальное состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  phoneBook: phoneBookInitialState,
  session: AuthenticationInitialState
};
