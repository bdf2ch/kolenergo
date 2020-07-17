import { ISchedulerState, schedulerInitialState } from './scheduler.state';
import { ESchedulerActions, SchedulerActions } from './sheduler.actions';

/**
 * Редуктор раздела управления заявками на облет
 * @param state - Состояние раздела управления заявками на облет
 * @param action - Действия раздела управления заявками на облет
 */
export function schedulerReducer(
  state: ISchedulerState = schedulerInitialState,
  action: SchedulerActions
): ISchedulerState {
  switch (action.type) {

    case ESchedulerActions.SCHEDULER_GET_INITIAL_DATA: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}
