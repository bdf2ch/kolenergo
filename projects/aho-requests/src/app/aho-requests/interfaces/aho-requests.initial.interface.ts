import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestRejectReason } from './aho-request-reject-reason.interface';

/**
 * Интерфейс, описывающий данные для инициализации приложения
 */
export interface IAhoRequestsInitialData {
  types: IAhoRequestType[];                   // Типы заявок
  statuses: IAhoRequestStatus[];              // Статусы заявок
  rejectReasons: IAhoRequestRejectReason[];   // Причины отклонения заявок
}
