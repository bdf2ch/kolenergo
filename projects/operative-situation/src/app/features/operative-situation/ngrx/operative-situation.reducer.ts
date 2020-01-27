import * as moment from 'moment';

import {actionTypes, authenticationActionTypes, Company, ICompany} from '@kolenergo/core';
import {IDivision, IPeriod} from '../../../interfaces';
import {Division, Period, Report, ReportSummary} from '../../../models';
import {IOperativeSituationState, operativeSituationInitialState} from './operative-situation.state';
import {OperativeSituationActions, OperativeSituationActionTypes} from './operative-situation.actions';

/**
 * Редуктор раздела отчетов по оперативной обстановке
 * @param state - Состояние раздела
 * @param action - Действие раздела
 */
export function reducer(
  state: IOperativeSituationState = operativeSituationInitialState,
  action: OperativeSituationActions | authenticationActionTypes
) {
  switch (action.type) {

    case actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS: {
      return {
        ...state,
        selectedCompany: action.payload.company ? new Company(action.payload.company) : null
      };
    }

    case OperativeSituationActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false,
        isApplicationInitialized: true,
        date: moment(action.payload.data.date, 'DD.MM.YYYY'),
        companies: action.payload.data.companies.map((item: ICompany) => new Company(item)),
        divisions: action.payload.data.divisions.map((item: IDivision) => new Division(item)),
        periods: action.payload.data.periods.map((item: IPeriod) => new Period(item)),
        selectedCompany: action.payload.data.user ? new Company(action.payload.data.user.company) : null,
        selectedDivision: null,
        selectedPeriod: new Period(action.payload.data.periods[0])
      };
    }

    case OperativeSituationActionTypes.LOAD_INITIAL_DATA_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false,
        reports: new ReportSummary(action.payload.data),
        selectedReport: action.payload.data.reports[state.selectedPeriod.time]
          ? new Report(action.payload.data.reports[state.selectedPeriod.time])
          : null
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false,
        reports: new ReportSummary(action.payload.data),
        selectedReport: action.payload.data.reports[state.selectedPeriod.time]
          ? new Report(action.payload.data.reports[state.selectedPeriod.time])
          : null
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.SELECT_COMPANY: {
      return {
        ...state,
        selectedCompany: action.payload,
        selectedDivision: null
      };
    }

    case OperativeSituationActionTypes.SELECT_DIVISION: {
      return {
        ...state,
        selectedDivision: action.payload
      };
    }

    case OperativeSituationActionTypes.SELECT_PERIOD: {
      return {
        ...state,
        selectedPeriod: action.payload,
        selectedReport: state.reports && state.reports.reports[action.payload.time]
          ? state.reports.reports[action.payload.time]
          : null
      };
    }

    case OperativeSituationActionTypes.SELECT_REPORT: {
      return {
        ...state,
        selectedReport: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
