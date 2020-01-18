import { IDepartment } from '@kolenergo/core';
import { ITransportType } from './transport-type.interface';
import { IRequestStatus } from './request-status.interface';
import { IRejectReason } from './reject-reason.interface';
import { ITransport } from './transport.interface';
import { IDriver } from './driver.interface';
import { IRequest } from './request.interface';

/**
 * Интерфейс, описывающий структуру данных для инициализации приложения
 */
export interface IAutoRequestsInitialData {
  date: Date;                         // Текущая дата
  departments: IDepartment[];         // Подразделения организации
  types: ITransportType[];            // Типы транспорта
  statuses: IRequestStatus[];         // Статусы заявок
  rejectReasons: IRejectReason[];     // Причины отказа в заявке
  transport: ITransport[];            // Транспортные средства
  drivers: IDriver[];                 // Водители
  requests: IRequest[];               // Заявки на автотранспорт
}
