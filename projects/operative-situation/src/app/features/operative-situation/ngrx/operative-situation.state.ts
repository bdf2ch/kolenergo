import { ICompany } from '@kolenergo/core';
import { IDivision, IPeriod } from '../../../interfaces';

/**
 * Интерфейс, описывающий состояние раздела отчетов по оперативной обстановке
 */
export interface IOperativeSituationState {
  isLoadingInProgress: boolean;         // Выполняется ли загрузка данных с сервера
  isApplicationInitialized: boolean;    // Инициализировано ли приложение
  date: Date;                           // Текущая дата
  companies: ICompany[];                // Список организаций
  divisions: IDivision[];               // Список структурных подразделений
  periods: IPeriod[];                   // Список временных периодов
  selectedCompany: ICompany;            // Текущая организация
  selectedDivision: IDivision;          // Текущее структурное подразделение
  selectedPeriod: IPeriod;              // Текущий временной промежуток
}

/**
 * Начальное состояние раздела отчетов по оперативной обстановке
 */
export const operativeSituationInitialState: IOperativeSituationState = {
  isLoadingInProgress: false,
  isApplicationInitialized: false,
  date: null,
  companies: [],
  divisions: [],
  periods: [],
  selectedCompany: null,
  selectedDivision: null,
  selectedPeriod: null
};
