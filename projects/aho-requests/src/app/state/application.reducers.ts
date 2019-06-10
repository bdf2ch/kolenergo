import {ahoInitialState, ApplicationModes, IAhoState} from './application.state';
import * as actions from './application.actions';
import {AhoRequest, AhoRequestRejectReason, AhoRequestStatus, AhoRequestType, FilterManager, SearchFilter} from '../aho-requests/models';
import {IAhoRequest, IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType} from '../aho-requests/interfaces';
import { Backup, User, IDepartment, Department} from 'kolenergo-core';


export function reducer(
  state: IAhoState = ahoInitialState,
  action: actions.AhoRequestsActions
): IAhoState {
  switch (action.type) {
    case actions.AhoRequestsActionTypes.RESET_REQUESTS: {
      return {
        ...state,
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
        currentPage: 0
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_ALL_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.ALL_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_ALL_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_OWN_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.OWN_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_OWN_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.EMPLOYEE_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.EXPIRED_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.floor(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_REQUEST_DETAILS: {
      return {
        ...state,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_REQUEST_DETAILS_SUCCESS: {
      return {
        ...state,
        selectedRequest: new AhoRequest(action.payload),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case actions.AhoRequestsActionTypes.SELECT_REQUESTS_MODE: {
      return {
        ...state,
        mode: action.payload
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...state,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS: {
      return {
        ...state,
        isApplicationInitialized: true,
        mode: action.payload.user.permissions.getRoleByCode('aho_requests_administrator')
          ? ApplicationModes.ALL_REQUESTS_MODE
          : ApplicationModes.OWN_REQUESTS_MODE,
        departments: action.payload.initialData.data.departments.map((item: IDepartment) => {
          return new Department(item);
        }),
        requestTypes: action.payload.initialData.data.types.map((item: IAhoRequestType) => {
          return new AhoRequestType(item);
        }),
        requestStatuses: action.payload.initialData.data.statuses.map((item: IAhoRequestStatus) => {
          return new AhoRequestStatus(item);
        }),
        requestRejectReasons: action.payload.initialData.data.rejectReasons.map((item: IAhoRequestRejectReason) => {
          return new AhoRequestRejectReason(item);
        }),
        employees: [...action.payload.initialData.data.employees.map((item) => new User(item))],
        requests: action.payload.initialData.data.requests.map((item: IAhoRequest) => {
          return new AhoRequest(item);
        }),
        newRequestsCount: action.payload.initialData.data.allRequests.fresh,
        ownRequestsCount: action.payload.initialData.data.ownRequests.total,
        ownUncompletedRequestsCount: action.payload.initialData.data.ownRequests.uncompleted,
        employeeRequestsCount: action.payload.initialData.data.employeeRequests.total,
        employeeUncompletedRequestsCount: action.payload.initialData.data.employeeRequests.uncompleted,
        expiredRequestsCount: action.payload.initialData.data.expiredRequests.total,
        totalPages: Math.round(action.payload.initialData.data.allRequests.total / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_REQUESTS:
      return {
        ...state,
        fetchingDataInProgress: true
      };
    case actions.AhoRequestsActionTypes.LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        currentPage: action.payload.data.page,
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.APPLY_FILTERS: {
      return {
        ...state,
        mode: ApplicationModes.SEARCH_REQUESTS_MODE,
        filters: new FilterManager(action.payload),
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.FILTERED_REQUESTS_LOAD_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        filteredRequestsCount: action.payload.data.totalRequests,
        isFiltersApplied: true,
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.RESET_FILTERS: {
      const filters = state.filters;
      filters.getFilters().forEach((filter: SearchFilter<any>) => {
        filter.reset();
      });
      return {
        ...state,
        filters: new FilterManager(filters.getFilters()),
        filteredRequestsCount: 0,
        isFiltersApplied: false,
        currentPage: 0
      };
    }
    case actions.AhoRequestsActionTypes.SELECT_REQUEST: {
      return {
        ...state,
        selectedRequest: Backup.makeBackupable(action.payload, ['tasks', 'employees', 'status'])
      };
    }
    default: {
      return state;
    }
  }
}
