import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IOperativeSituationState} from '../operative-situation.state';
import { IApplicationState } from '../../../../ngrx';
import { IDivision, IPeriod, IReport } from '../../../../interfaces';
import { ICompany } from '@kolenergo/core';

/**
 * Селектор раздела с отчетами по оперативной обстановке
 */
export const selectOSR = createFeatureSelector<IApplicationState, IOperativeSituationState>('osr');

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectLoadingInProgress = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.isLoadingInProgress
);

/**
 * Селектор состояния инициализации приложения
 */
export const selectApplicationInitialized = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.isApplicationInitialized
);

/**
 * Селектор текущей даты
 */
export const selectDate = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.date
);

/**
 * Селектор списка временных промежутков
 */
export const selectPeriods = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.periods
);

/**
 * Селектор списка организаций
 */
export const selectCompanies = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.companies
);

/**
 * Селектор списка структурных подразделений
 */
export const selectDivisions = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.divisions
);

/**
 * Селектор текущей организации
 */
export const selectSelectedCompany = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.selectedCompany
);

/**
 * Селектор структурных подразделений первого уровня по идентификатору организации
 */
export const selectSelectedCompanyRootDivisions = createSelector(
  selectOSR,
  selectSelectedCompany,
  (state: IOperativeSituationState, company: ICompany) => state.divisions.filter(
    (division: IDivision) => division.companyId === company.id && division.parentId === 0
  )
);

/**
 * Селектор текущего структурного подразделения
 */
export const selectSelectedDivision = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.selectedDivision
);

/**
 * Селектор дочерних структурных подразделений по идентификатору структурного подразделения
 */
export const selectNestedDivisionsByDivisionId = createSelector(
  selectOSR,
  (state: IOperativeSituationState, props) => state.divisions.filter(
    (division: IDivision) => division.parentId === props.divisionId
  )
);

/**
 * Селектор текущего временного промежутка
 */
export const selectSelectedPeriod = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.selectedPeriod
);

/**
 * Селектор списка отчетов об оперативной обстановке
 */
export const selectReports = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.reports
);

/**
 * Селектор контрольных отметок времени в сводке отчетов об оперативнйо обстановке
 */
export const selectReportsTime = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.reportsTime
);

/**
 * Селектор текущего отчета об оперативной обстановке
 */
export const selectSelectedReport = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.selectedReport
);

/**
 * Селектор текущей поголдоной сводке по текущему отчету об оперативной обстановке
 */
export const selectSelectedReportWeatherSummary = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.selectedReportWeatherSummary
);





