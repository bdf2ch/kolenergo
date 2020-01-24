import { ICompany } from '@kolenergo/core';
import { IDivision, IPeriod, IReport } from '../../../interfaces';
import {Report} from '../../../models/report.model';

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
  reports: Report[];                    // Список отчетов об оперативной обстановке
  selectedCompany: ICompany;            // Текущая организация
  selectedDivision: IDivision;          // Текущее структурное подразделение
  selectedPeriod: IPeriod;              // Текущий временной промежуток
  selectedReport: Report;               // Текущий отчет
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
  reports: [],
  selectedCompany: null,
  selectedDivision: null,
  selectedPeriod: null,
  selectedReport: new Report()
};
