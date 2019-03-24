import { IUser } from 'kolenergo-core';
import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestRejectReason } from './aho-request-reject-reason.interface';
import { IAhoRequestComment } from './aho-request-comment.interface';
import { IAhoRequestTask } from './aho-request-task.interface';

/**
 * Интерфейс, описывающий заявку АХО
 */
export interface IAhoRequest {
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
  dateExpires: number;                      // Дата исполнения заявки в формате Unix
  numberOfLoaders: number;                  // Требуемое количество грузчиков
  initiator: string;                        // Инициатор
  phone: string;                            // Контактный телефон
}
