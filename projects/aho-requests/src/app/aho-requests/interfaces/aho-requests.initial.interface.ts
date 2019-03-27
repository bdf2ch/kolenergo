import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestRejectReason } from './aho-request-reject-reason.interface';
import { IAhoRequest } from './aho-request.interface';
import { IUser } from 'kolenergo-core';

/**
 * Интерфейс, описывающий данные для инициализации приложения
 */
export interface IAhoRequestsInitialData {
  types: IAhoRequestType[];                   // Типы заявок
  statuses: IAhoRequestStatus[];              // Статусы заявок
  rejectReasons: IAhoRequestRejectReason[];   // Причины отклонения заявок
  employees: IUser[];
  requests: IAhoRequest[];                    // Заявки
  allRequests: {
    totalRequestsCount: number,
    newRequestsCount: number,
    requests: IAhoRequest[]
  };
  ownRequests_: {
    totalRequestsCount: number,
    uncompletedRequestsCount: number,
    requests: IAhoRequest[]
  };
  employeeRequests_: {
    totalRequestsCount: number,
    uncompletedRequestsCount: number,
    requests: IAhoRequest[]
  };
  expiredRequests_: {
    requests: IAhoRequest[],
    totalRequestsCount: number
  };
}
