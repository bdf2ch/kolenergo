import { PressReport } from '../models';
import { Company } from '@kolenergo/core';

/**
 * Интерфейс, описывающий состояние отчетов СМИ
 */
export interface IPressReportsState {
  date: Date;                             // Текущая дата
  selectedDate: Date;                     // Выбранная дата
  reports: PressReport[];                 // Отчеты о публикациях в СМИ
  companies: Company[];                   // Перечень организаций
  fetchingReportsInProgress: boolean;     // Выполняется ли загрузка отчетов с сервера
  addingReportInProgress: boolean;        // Выполняется ли добавление отчета
  editingReportInProgress: boolean;       // Выполняется ли сохранение измененного отчета
  deletingInProgress: boolean;            // Выполняется ли удаление отчетов
}

/**
 * Начальное состояние отчетов СМИ
 */
export const pressReportsInitialState: IPressReportsState = {
  date: null,
  selectedDate: null,
  reports: [],
  companies: [],
  fetchingReportsInProgress: false,
  addingReportInProgress: false,
  editingReportInProgress: false,
  deletingInProgress: false
};
