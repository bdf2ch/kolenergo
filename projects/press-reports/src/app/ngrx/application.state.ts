import { IAuthenticationState } from 'kolenergo-core/lib/authentication/state/authentication.state';
import { IPressReportsState } from '../press-reports/ngrx';

/**
 * Интерфейс, описывающий состояние всего приложения
 */
export interface IApplicationState {
  reports: IPressReportsState;
  session: IAuthenticationState;
}
