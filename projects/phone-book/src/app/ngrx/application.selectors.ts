import { createSelector } from '@ngrx/store';

import { IApplicationState, IPhoneBookState } from './application.state';
import {PhoneBookDivision} from '../models';

/**
 * Селектор дерева параметров телефонного справочника
 * @param state - Состояние приложения
 */
export const selectPhoneBook = (state: IApplicationState) => state.phoneBook;

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectFetchingInProgress = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.isFetchingInProgress
);

/**
 * Селектор состояния поиска абонентов
 */
export const selectSearchingInProgress = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.isSearchingInProgress
);

/**
 * Селектор текущего режима отображения приложения
 */
export const selectApplicationViewMode = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.viewMode
);

/**
 * Селектор текущего режима приложения
 */
export const selectApplicationMode = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.applicationMode
);

/**
 * Селектор текущей организации
 */
export const selectSelectedCompany = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.selectedCompany
);

/**
 * Селектор состояния отображения кнопки открытия боковой панели
 */
export const selectShowSidebarToggleButton = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.showSidebarToggleButton
);

/**
 * Селектор организаций
 */
export const selectCompanies = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.companies
);

/**
 * Селектор организации оп идентификатору
 */
export const selectCompanyById = createSelector(
  selectCompanies,
  (companies, props) => companies.filter((company: PhoneBookDivision) => company.id === props.companyId)
);

/**
 * Селектор структурных подразделений
 */
export const selectDivisions = createSelector(
  selectPhoneBook,
  (state: IPhoneBookState) => state.divisions
);
