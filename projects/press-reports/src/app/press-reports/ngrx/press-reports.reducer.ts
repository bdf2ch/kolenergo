import * as moment from 'moment';

import {Company, ICompany} from '@kolenergo/core';
import {IPressReport} from '../interfaces';
import {PressReport} from '../models';
import {PressReportsActions, PressReportsActionTypes} from './press-reports.actions';
import {IPressReportsState, pressReportsInitialState} from './press-reports.state';
import {ApplicationActions, ApplicationActionTypes} from '../../ngrx/application.actions';

export function pressReportsReducer(
  state: IPressReportsState = pressReportsInitialState,
  action: PressReportsActions | ApplicationActions
): IPressReportsState {
  switch (action.type) {
    case ApplicationActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return  {
        ...state,
        date: moment(action.payload.data.date, 'DD.MM.YYYY').toDate(),
        selectedDate: moment(action.payload.data.date, 'DD.MM.YYYY').toDate(),
        companies: [...action.payload.data.companies.map((item: ICompany) => {
          return new Company(item);
        })],
        reports: [...action.payload.data.reports.map((item: IPressReport) => {
          return new PressReport(item);
        })]
      };
    }
    case PressReportsActionTypes.LOAD_REPORTS_BY_DATE: {
      return {
        ...state,
        selectedDate: moment(action.payload, 'DD.MM.YYYY').toDate(),
        fetchingReportsInProgress: true
      };
    }
    case PressReportsActionTypes.LOAD_REPORTS_BY_DATE_SUCCESS: {
      return {
        ...state,
        reports: [...action.payload.data.map((item: IPressReport) => {
          return new PressReport(item);
        })],
        fetchingReportsInProgress: false
      };
    }
    case PressReportsActionTypes.ADD_REPORTS: {
      return {
        ...state,
        addingReportInProgress: true
      };
    }
    case PressReportsActionTypes.ADD_REPORTS_SUCCESS: {
      return {
        ...state,
        reports: [...action.payload.data.map((item: IPressReport) => {
          return new PressReport(item);
        })],
        addingReportInProgress: false
      };
    }
    case PressReportsActionTypes.EDIT_REPORT: {
      return {
        ...state,
        editingReportInProgress: true
      };
    }
    case PressReportsActionTypes.EDIT_REPORT_SUCCESS: {
      return {
        ...state,
        reports: [...action.payload.data.map((item: IPressReport) => {
          return new PressReport(item);
        })],
        editingReportInProgress: false
      };
    }
    case PressReportsActionTypes.DELETE_REPORTS_BY_DATE: {
      return {
        ...state,
        deletingInProgress: true
      };
    }
    case PressReportsActionTypes.DELETE_REPORTS_BY_DATE_SUCCESS: {
      return {
        ...state,
        reports: [],
        deletingInProgress: false
      };
    }
    default: {
      return state;
    }
  }
}
