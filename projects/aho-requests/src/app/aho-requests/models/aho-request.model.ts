import {
  IAhoRequest, IAhoRequestComment,
  IAhoRequestRejectReason,
  IAhoRequestStatus,
  IAhoRequestTask,
  IAhoRequestType
} from '../interfaces';
import { IUser, User } from 'kolenergo-core';
import { AhoRequestType } from './aho-request-type.model';
import { AhoRequestStatus } from './aho-request-status.model';
import { AhoRequestRejectReason } from './aho-request-reject-reason.model';
import { AhoRequestTask } from './aho-request-task.model';
import { AhoRequestComment } from './aho-request-comment.model';

/**
 * Класс, реализующий интерфейс заявки АХО
 */
export class AhoRequest implements IAhoRequest {
  id: number;                               // Идентфиикатор
  type: IAhoRequestType;                    // Тип заявки
  status: IAhoRequestStatus;                // Статус заявки
  rejectReason?: IAhoRequestRejectReason;   // Причина отклонения заявки
  user: IUser;                              // Пользователь, подавший заявку
  tasks: IAhoRequestTask[];                 // Задачи
  employees: IUser[];                       // Исполнители заявки
  comments: IAhoRequestComment[];           // Комментарии к заявке
  room: string;                             // Кабинет
  dateCreated: number;                      // Дата создания заявки в формате Unix
  dateCreatedD: Date;                       // Дата создвния заявки
  dateExpires: number;                      // Дата исполнения заявки в формате Unix
  dateExpiresD: Date;                       // Дата исполенния заявки
  isExpired: boolean;                       // Просрочена ли заявка
  numberOfLoaders: number;                  // Требуемое количество грузчиков
  initiator: string;                        // Инициатор
  phone: string;                            // Контактный телефон
  isExpanded: boolean;                      // Развернута ли заявка

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequest) {
    this.id = config ? config.id : null;
    this.type = config ? new AhoRequestType(config.type) : null;
    this.status = config ? new AhoRequestStatus(config.status) : null;
    this.rejectReason = config && config.rejectReason ? new AhoRequestRejectReason(config.rejectReason) : null;
    this.user = config ? new User(config.user) : null;
    this.tasks = [];
    this.employees = [];
    this.comments = [];
    this.room = config ? config.room : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateExpires = config ? config.dateExpires : null;
    this.dateExpiresD = config && config.dateExpires ? new Date(config.dateExpires) : null;
    this.isExpired = config ? config.isExpired : false;
    this.numberOfLoaders = config ? config.numberOfLoaders : null;
    this.initiator = config ? config.initiator : null;
    this.phone = config ? config.phone : null;
    this.isExpanded = false;

    this.tasks = config.tasks.map((item: IAhoRequestTask) => {
      return new AhoRequestTask(item);
    });

    this.employees = config.employees.map((item: IUser) => {
      return new User(item);
    });

    this.comments = config.comments.map((item: IAhoRequestComment) => {
      return new AhoRequestComment(item);
    });
  }

  expand() {
    this.isExpanded = true;
  }
}
