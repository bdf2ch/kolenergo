import { ICompany } from '@kolenergo/core';
import { IDivision, IPeriod } from '../../../interfaces';

/**
 * Интерфейс, описывающий состояние раздела отчетов по оперативной обстановке
 */
export interface IOperativeSituationState {
  isLoadingInProgress: boolean;
  date: Date;
  companies: ICompany[];
  divisions: IDivision[];
  periods: IPeriod[];
}

/**
 * Начальное состояние раздела отчетов по оперативной обстановке
 */
export const operativeSituationInitialState: IOperativeSituationState = {
  isLoadingInProgress: false,
  date: null,
  companies: [],
  divisions: [],
  periods: []
};
