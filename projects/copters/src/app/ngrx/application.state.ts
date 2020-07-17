import { IAuthenticationState } from '@kolenergo/core';
import { ISchedulerState } from '../features/scheduler/ngrx';

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  session: IAuthenticationState;      // Текущая сессия
  scheduler: ISchedulerState;         // Раздел заявок на облет
}
