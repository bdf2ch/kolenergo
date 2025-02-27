import * as moment from 'moment';

import { IAuthenticationState, AuthenticationInitialState, User, Department } from 'kolenergo-core';
import { AhoRequest, AhoRequestStatus, AhoRequestType, FilterManager, SearchFilter } from '../aho-requests/models';
import { IAhoRequest, IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType } from '../aho-requests/interfaces';

export enum ApplicationModes {
  SEARCH_REQUESTS_MODE = 'search-requests-mode',
  ALL_REQUESTS_MODE = 'all-requests-mode',
  OWN_REQUESTS_MODE = 'own-requests-mode',
  EMPLOYEE_REQUESTS_MODE = 'employee-requests-mode',
  EXPIRED_REQUESTS_MODE = 'expired-requests-mode'
}

export interface IAhoState {
  mode: ApplicationModes;
  fetchingDataInProgress: boolean;
  isApplicationInitialized: boolean;
  departments: Department[];
  requestTypes: IAhoRequestType[];
  requestStatuses: IAhoRequestStatus[];
  requestRejectReasons: IAhoRequestRejectReason[];
  employees: User[];
  filters: FilterManager;
  requests: IAhoRequest[];
  totalRequestsCount: number;
  newRequestsCount: number;
  ownRequestsCount: number;
  ownUncompletedRequestsCount: number;
  employeeRequestsCount: number;
  employeeUncompletedRequestsCount: number;
  expiredRequestsCount: number;
  isFiltersApplied: boolean;
  filteredRequestsCount: number;
  selectedRequest: AhoRequest;
  totalPages: number;
  currentPage: number;
  itemsOnPage: number;
}

export const ahoInitialState: IAhoState = {
  mode: ApplicationModes.ALL_REQUESTS_MODE,
  fetchingDataInProgress: false,
  isApplicationInitialized: false,
  departments: [],
  requestTypes: [],
  requestStatuses: [],
  requestRejectReasons: [],
  employees: [],
  filters: new FilterManager([
    new SearchFilter<Date>('start-selectedDate$', 'Начальная дата', null, (value: Date) => `с ${moment(value).format('DD.MM.YYYY')}`),
    new SearchFilter<Date>('end-selectedDate$', 'Конечная дата', null, (value: Date) => `по ${moment(value).format('DD.MM.YYYY')}`),
    new SearchFilter<User>('request-employee', 'Исполнитель', null, (value: User) => `${value.firstName} ${value.lastName}`, null),
    new SearchFilter<AhoRequestType>('request-type', 'Категория заявки', null, (value: AhoRequestType) => value.title, null),
    new SearchFilter<AhoRequestStatus>('request-status', 'Статус заявки', null, (value: AhoRequestStatus) => value.title, null)
  ]),
  requests: [],
  totalRequestsCount: 0,
  newRequestsCount: 0,
  ownRequestsCount: 0,
  ownUncompletedRequestsCount: 0,
  employeeRequestsCount: 0,
  employeeUncompletedRequestsCount: 0,
  expiredRequestsCount: 0,
  filteredRequestsCount: 0,
  isFiltersApplied: false,
  selectedRequest:  null,
  totalPages: 0,
  currentPage: 0,
  itemsOnPage: 20
};


export interface IApplicationState {
  session: IAuthenticationState;
  aho: IAhoState;
}

export const initialState: IApplicationState = {
  session: AuthenticationInitialState,
  aho: ahoInitialState
};


