import { ICompany } from '@kolenergo/core';
import { IDivision, IPeriod, IReport } from '../../../interfaces';
import { Report, ReportSummary, WeatherSummary } from '../../../models';

/**
 * Интерфейс, описывающий состояние раздела отчетов по оперативной обстановке
 */
export interface IOperativeSituationState {
  isLoadingInProgress: boolean;                   // Выполняется ли загрузка данных с сервера
  isApplicationInitialized: boolean;              // Инициализировано ли приложение
  date: Date;                                     // Текущая дата
  companies: ICompany[];                          // Список организаций
  divisions: IDivision[];                         // Список структурных подразделений
  periods: IPeriod[];                             // Список временных периодов
  reports: ReportSummary;                         // Сводка отчетов об оперативной обстановке
  reportsTime: string[];                          // Контрольные отметки времени в сводке отчетов об оперативнйо обстановке
  selectedCompany: ICompany;                      // Текущая организация
  selectedDivision: IDivision;                    // Текущее структурное подразделение
  selectedPeriod: IPeriod;                        // Текущий временной промежуток
  selectedReport: Report;                         // Текущий отчет
  selectedReportWeatherSummary: WeatherSummary;   // Погодная сводка по текущему отчету
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
  reports: null,
  reportsTime: [],
  selectedCompany: null,
  selectedDivision: null,
  selectedPeriod: null,
  selectedReport: null,
  selectedReportWeatherSummary: null
};
