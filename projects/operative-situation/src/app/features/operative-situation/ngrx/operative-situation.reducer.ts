import * as moment from 'moment';

import {IOperativeSituationState, operativeSituationInitialState} from './operative-situation.state';
import {OperativeSituationActions, OperativeSituationActionTypes} from './operative-situation.actions';
import {Company, ICompany} from '@kolenergo/core';
import {IDivision, IPeriod} from '../../../interfaces';
import {Division, Period} from '../../../models';

/**
 * Редуктор раздела отчетов по оперативной обстановке
 * @param state - Состояние раздела
 * @param action - Действие раздела
 */
export function reducer(
  state: IOperativeSituationState = operativeSituationInitialState,
  action: OperativeSituationActions
) {
  switch (action.type) {

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
        date: moment(action.payload.data.date, 'DD.MM.YYYY'),
        companies: action.payload.data.companies.map((item: ICompany) => new Company(item)),
        divisions: action.payload.data.divisions.map((item: IDivision) => new Division(item)),
        periods: action.payload.data.periods.map((item: IPeriod) => new Period(item))
      };
    }

    case OperativeSituationActionTypes.LOAD_INITIAL_DATA_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    default: {
      return state;
    }
  }
}
