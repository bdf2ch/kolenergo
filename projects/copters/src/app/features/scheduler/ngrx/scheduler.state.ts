import { Copter, Employee, RequestStatus } from '../../../models';

/**
 * Интерфейс, описывающий состояние раздела с заявками
 */
export interface ISchedulerState {
  isLoading: boolean;
  statuses: RequestStatus[];
  copters: Copter[];
  employees: Employee[];
}

/**
 * Начальное состояние раздела с заявками
 */
export const schedulerInitialState: ISchedulerState = {
  isLoading: false,
  statuses: [],
  copters: [],
  employees: []
};
