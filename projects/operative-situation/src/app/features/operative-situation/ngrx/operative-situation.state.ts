import { ICompany } from '@kolenergo/core';
import { IDivision, IPeriod } from '../../../interfaces';
import {  Period, Report, ReportSummary, TimeMark } from '../../../models';

/**
 * Интерфейс, описывающий состояние раздела отчетов по оперативной обстановке
 */
export interface IOperativeSituationState {
  isLoadingInProgress: boolean;                   // Выполняется ли загрузка данных с сервера
  isConsumptionLoadingInProgress: boolean;        // Выполняется ли загрузка данных о потреблении
  isApplicationInitialized: boolean;              // Инициализировано ли приложение
  date: Date;                                     // Текущая дата
  companies: ICompany[];                          // Список организаций
  divisions: IDivision[];                         // Список структурных подразделений
  periods: Period[];                              // Список временных периодов
  reports: ReportSummary;                         // Сводка отчетов об оперативной обстановке
  consumption: number;                            // Максимальное потребление за прошедшие сутки
  selectedCompany: ICompany;                      // Текущая организация
  selectedDivision: IDivision;                    // Текущее структурное подразделение
  selectedPeriod: IPeriod;                        // Текущий временной промежуток
  selectedTime: TimeMark;                         // Текущее время отчета
  selectedReport: Report;                         // Текущий отчет
}

/**
 * Начальное состояние раздела отчетов по оперативной обстановке
 */
export const operativeSituationInitialState: IOperativeSituationState = {
  isLoadingInProgress: false,
  isConsumptionLoadingInProgress: false,
  isApplicationInitialized: false,
  date: null,
  companies: [],
  divisions: [],
  periods: [],
  reports: null,
  consumption: 0,
  selectedCompany: null,
  selectedDivision: null,
  selectedPeriod: null,
  selectedTime: null,
  selectedReport: null,
};
