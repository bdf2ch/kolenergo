import * as moment from 'moment';

import { actionTypes, authenticationActionTypes, Company, ICompany } from '@kolenergo/core';
import { IDivision, IPeriod } from '../../../interfaces';
import { Division, Period, Report, ReportSummary, TimeMark } from '../../../models';
import { IOperativeSituationState, operativeSituationInitialState } from './operative-situation.state';
import { OperativeSituationActions, OperativeSituationActionTypes } from './operative-situation.actions';

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
        selectedCompany:
          action.payload.company ?
            action.payload.company.id === 8
              ? new Company(state.companies[0])
              : new Company(action.payload.company)
            : null
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
        reports: new ReportSummary(action.payload.data.reports),
        consumption: action.payload.data.consumption,
        selectedCompany:
          action.payload.data.user ?
            action.payload.data.user.company.id === 8
              ? new Company(action.payload.data.companies[0])
              : new Company(action.payload.data.user.company)
            : null,
        selectedReport: new ReportSummary(action.payload.data.reports).reports.pop(),
        selectedDivision: null,
        selectedPeriod: new Period(action.payload.data.periods[0]),
        selectedTime: action.payload.data.reports.reports.length > 0
          ? new TimeMark(
            new ReportSummary(action.payload.data.reports).reports.pop().periodId,
            new ReportSummary(action.payload.data.reports).reports.pop().periodTime
          )
          : null
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
        consumption: action.payload.data.consumption,
        selectedTime: action.payload.data.reports.length > 0
          ? new TimeMark(
            new ReportSummary(action.payload.data).reports.pop().periodId,
            new ReportSummary(action.payload.data).reports.pop().periodTime
          )
          : null,
        selectedReport: new ReportSummary(action.payload.data).reports.pop()
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
        consumption: action.payload.data.consumption,
        selectedReport: new ReportSummary(action.payload.data).reports.pop(),
        selectedTime: action.payload.data.reports.length > 0
          ? new TimeMark(
              new ReportSummary(action.payload.data).reports.pop().periodId,
              new ReportSummary(action.payload.data).reports.pop().periodTime
            )
          : null
      };
    }

    case OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.ADD_REPORT: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.ADD_REPORT_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false,
        reports: new ReportSummary(action.payload.data),
        selectedReport: new ReportSummary(action.payload.data).reports.pop(),
        selectedTime: new TimeMark(
          new ReportSummary(action.payload.data).reports.pop().periodId,
          new ReportSummary(action.payload.data).reports.pop().periodTime
        )
      };
    }

    case OperativeSituationActionTypes.ADD_REPORT_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.EDIT_REPORT: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.EDIT_REPORT_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false,
        reports: new ReportSummary(action.payload.data),
        selectedReport:
          new ReportSummary(action.payload.data).reports
            .find((report: Report) => report.periodTime === state.selectedTime.time)
      };
    }

    case OperativeSituationActionTypes.EDIT_REPORT_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.EXPORT_REPORT: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.EXPORT_REPORT_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.EXPORT_REPORT_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case OperativeSituationActionTypes.ADD_CONSUMPTION: {
      return {
        ...state,
        isConsumptionLoadingInProgress: true
      };
    }

    case OperativeSituationActionTypes.ADD_CONSUMPTION_SUCCESS: {
      return {
        ...state,
        isConsumptionLoadingInProgress: false,
        consumption: action.payload.data
      };
    }

    case OperativeSituationActionTypes.ADD_CONSUMPTION_FAIL: {
      return {
        ...state,
        isConsumptionLoadingInProgress: false
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
        reportsTime: state.reports.getReportTimesByInterval(action.payload.interval),
        selectedPeriod: action.payload,
        selectedReport: state.reports && state.reports.reports[action.payload.interval]
          ? state.reports.getFirstReportOfInterval(action.payload.interval)
          : null,
        selectedReportWeatherSummary: state.reports.getWeatherSummaryByInterval(action.payload.interval)
      };
    }

    case OperativeSituationActionTypes.SELECT_TIME: {
      return {
        ...state,
        // selectedPeriod: action.payload.period,
        selectedTime: action.payload,
        selectedReport: state.reports.reports.find((report: Report) => report.periodTime === action.payload.time)
          ? state.reports.reports.find((report: Report) => report.periodTime === action.payload.time)
          : null
      };
    }

    case OperativeSituationActionTypes.SELECT_REPORT: {
      return {
        ...state,
        selectedReport: action.payload
      };
    }

    case OperativeSituationActionTypes.SWITCH_TO_MOBILE_MODE: {
      return {
        ...state,
        isMobileMode: action.payload
      };
    }

    case OperativeSituationActionTypes.CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: false
      };
    }

    case OperativeSituationActionTypes.OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: true
      };
    }

    default: {
      return state;
    }
  }
}
