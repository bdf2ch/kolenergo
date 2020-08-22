import { IDepartment, IUser } from '@kolenergo/core';
import { ITransportType } from './transport-type.interface';
import { IRequestStatus } from './request-status.interface';
import { IRejectReason } from './reject-reason.interface';
import { ITransport } from './transport.interface';
import { IDriver } from './driver.interface';
import { IRequest } from './request.interface';
import {IRoutePoint} from './route-point.interface';

/**
 * Интерфейс, описывающий структуру данных для инициализации приложения
 */
export interface IInitialData {
  date: Date;                         // Текущая дата
  departments: IDepartment[];         // Подразделения организации
  types: ITransportType[];            // Типы транспорта
  routes: IRoutePoint[];              // Элементы маршрута
  statuses: IRequestStatus[];         // Статусы заявок
  rejectReasons: IRejectReason[];     // Причины отказа в заявке
  transport: ITransport[];            // Транспортные средства
  drivers: IDriver[];                 // Водители
  requests: IRequest[];               // Заявки на автотранспорт
  user?: IUser;                       // Текущий пользователь
}
