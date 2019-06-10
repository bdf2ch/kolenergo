import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestRejectReason } from './aho-request-reject-reason.interface';
import { IAhoRequest } from './aho-request.interface';
import { IDepartment, IUser } from 'kolenergo-core';

/**
 * Интерфейс, описывающий данные для инициализации приложения
 */
export interface IAhoRequestsInitialData2 {
  departments: IDepartment[];                 // Подразделения организации
  types: IAhoRequestType[];                   // Типы заявок
  statuses: IAhoRequestStatus[];              // Статусы заявок
  rejectReasons: IAhoRequestRejectReason[];   // Причины отклонения заявок
  employees: IUser[];                         // Сотрудники
  requests: IAhoRequest[];                    // Заявки
  allRequests: {
    total: number,                            // Количество всех заявок
    fresh: number                             // Количество новых заявок
  };
  ownRequests: {
    total: number,                            // Количество всех заявок пользователя
    uncompleted: number                       // Количество заявок пользователя в работе
  };
  employeeRequests: {
    total: number,                            // Количество всех заявок, в которых пользователь является исполнителем
    uncompleted: number                       // Количество заявок в работе, в которых пользователь является исполнителем
  };
  expiredRequests: {
    total: number                             // Количество просроченных заявок
  };
}
