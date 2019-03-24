import { IAuthenticationState, authenticationInitialState } from 'kolenergo-core';
import { AhoRequestStatus, AhoRequestType, SearchFilter } from '../aho-requests/models';
import { IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType } from '../aho-requests/interfaces';
import { User } from 'kolenergo-core';
import * as moment from 'moment';

export interface IApplicationState {
  // session: IAuthenticationState;
  requestTypes: IAhoRequestType[];
  requestStatuses: IAhoRequestStatus[];
  requestRejectReasons: IAhoRequestRejectReason[];
  filters: SearchFilter<any>[];
}

export const initialState: IApplicationState = {
  // session: authenticationInitialState
  requestTypes: [],
  requestStatuses: [],
  requestRejectReasons: [],
  filters: [
    new SearchFilter<Date>('start-date', 'Начальная дата', new Date(), (value: Date) => `с ${moment(value).format('DD.MM.YYYY')}`),
    new SearchFilter<Date>('end-date', 'Конечная дата', new Date(), (value: Date) => `по ${moment(value).format('DD.MM.YYYY')}`),
    new SearchFilter<User>('request-employee', 'Исполнитель', null, (value: User) => `${value.firstName} ${value.lastName}`, null),
    new SearchFilter<AhoRequestType>('request-type', 'Тип заявки', null, (value: AhoRequestType) => value.title, null),
    new SearchFilter<AhoRequestStatus>('request-status', 'Статус заявки', null, (value: AhoRequestStatus) => value.title, null)
  ]
};
