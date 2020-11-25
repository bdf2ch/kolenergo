import { IUser, User } from '@kolenergo/core';
import { IRequest } from '../interfaces/request.interface';
import { ITransportType } from '../interfaces/transport-type.interface';
import { ITransport } from '../interfaces/transport.interface';
import { IDriver } from '../interfaces/driver.interface';
import { IRequestStatus } from '../interfaces/request-status.interface';
import { TransportType } from './transport-type.model';
import { Transport } from './transport.model';
import { Driver } from './driver.model';
import { RequestStatus } from './request-status.model';
import { RoutePoint } from './route-point.model';
import { IRejectReason } from '../interfaces/reject-reason.interface';
import { RejectReason } from './reject-reason.model';
import { IRequestComment, IRoutePoint } from '../interfaces';
import { RequestComment } from './request-comment.model';

/**
 * Класс, реализующий интерфейс заявки на автотранспорт
 */
export class Request implements IRequest {
  id: number;                         // Идентификатор
  type: ITransportType;               // Тип автотранспорта
  transport: ITransport;              // Транспортное средство
  driver: IDriver;                    // Водитель
  user: IUser;                        // Пользователь, разместивший заявку
  initiator: IUser | string;          // Инициатор заявки
  status: IRequestStatus;             // Статус заявки
  rejectReason: IRejectReason;        // Причина отказа в заявке
  startTime: number;                  // Дата и время начала поездки в формате Unix
  startTimeD: Date;                   // Дата и время начала поездки
  endTime: number;                    // Дата и время окончания поездки в формате Unix
  endTimeD: Date;                     // Дата и время окончания поездки
  route: RoutePoint[];                // Маршрут
  description: string;                // Детали поездки
  dateCreated: number;                // Дата и время создания заявки в формате Unix
  dateCreatedD: Date;                 // Дата и время создания заявки
  dateModified: number;               // Дата и время изменения заявки в формате Unix
  dateModifiedD: Date;                // Дата и время изменения заявки
  finishTime: number;                 // Дата и время завершения поездки в формате Unix
  finishTimeD: Date;                  // Дата и время завершения поездки
  comments: IRequestComment[];        // Комментарии к заявке

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRequest) {
    this.id = config ? config.id : null;
    this.type = config ? new TransportType(config.type) : null;
    this.transport = config && config.transport ? new Transport(config.transport) : null;
    this.driver = config && config.driver ? new Driver(config.driver) : null;
    this.user = config ? new User(config.user) : null;
    this.initiator =
      config && config.initiator ?
        config.initiator.hasOwnProperty('id')
          ? new User(config.initiator as IUser)
          : config.initiator as string
        : null;
    this.status = config ? new RequestStatus(config.status) : null;
    this.rejectReason = config && config.rejectReason ? new RejectReason(config.rejectReason) : null;
    this.startTime = config ? config.startTime : null;
    this.startTimeD = config ? new Date(config.startTime) : null;
    this.endTime = config ? config.endTime : null;
    this.endTimeD = config ? new Date(config.endTime) : null;
    this.route = config ? config.route.map((route: IRoutePoint) => new RoutePoint(route)) : [];
    this.description = config && config.description ? config.description : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateModified = config ? config.dateModified : null;
    this.dateModifiedD = config ? new Date(config.dateModified) : null;
    this.finishTime = config ? config.finishTime : null;
    this.finishTimeD = config && config.finishTime ? new Date(config.finishTime) : null;
    this.comments = config && config.comments ? config.comments.map((item: IRequestComment) => new RequestComment(item)) : [];
  }

  /**
   * Создание идентичного объека на основе текущего
   */
  clone(): Request {
    const request = new Request();
    request.id = this.id;
    request.type = this.type;
    request.transport = this.transport;
    request.driver = this.driver;
    request.user = this.user;
    request.initiator = this.initiator;
    request.status = this.status;
    request.rejectReason = this.rejectReason;
    request.startTime = this.startTime;
    request.startTimeD = this.startTimeD;
    request.endTime = this.endTime;
    request.endTimeD = this.endTimeD;
    request.route = this.route;
    request.description = this.description;
    request.dateCreated = this.dateCreated;
    request.dateCreatedD = this.dateCreatedD;
    request.dateModified = this.dateModified;
    request.dateModifiedD = this.dateModifiedD;
    request.comments = this.comments;
    return  request;
  }
}
