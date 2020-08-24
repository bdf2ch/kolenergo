import { IUser } from '@kolenergo/core';
import { ITransportType } from './transport-type.interface';
import { ITransport } from './transport.interface';
import { IRequestStatus } from './request-status.interface';
import { IDriver } from './driver.interface';
import { IRejectReason } from './reject-reason.interface';
import { IRequestComment } from './request-comment.interface';
import { RoutePoint } from '../models';

/**
 * Интерфейс, описывающий заявку на автотранспорт
 */
export interface IRequest {
  id: number;                         // Идентификатор
  type: ITransportType;               // Тип автотранспорта
  transport?: ITransport;             // Транспортное средство
  driver?: IDriver;                   // Водитель
  user: IUser;                        // Пользователь, разместивший заявку
  initiator?: IUser | string;         // Инициатор заявки
  status: IRequestStatus;             // Статус
  rejectReason?: IRejectReason;       // Причина отказа в заявке
  startTime: number;                  // Дата и время начала поездки в формате Unix
  endTime: number;                    // Дата и время окончания поездки в формате Unix
  route: RoutePoint[] | string[];     // Маршрут
  description?: string;               // Детали поездки
  dateCreated: number;                // Дата и время создания заявки в формате Unix
  dateModified?: number;              // Дата и время изменения заявки в формате Unix
  comments?: IRequestComment[];       // Комментарии к заявке
}
