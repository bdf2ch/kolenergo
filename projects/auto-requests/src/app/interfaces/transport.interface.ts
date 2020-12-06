import { IDepartment } from '@kolenergo/core';
import { ITransportType } from './transport-type.interface';

/**
 * Интерфейс, описывающий транспортное средство
 */
export interface ITransport {
  id: number;                   // Идентификатор
  department: IDepartment;      // Подразделение организации, к которому относится транспортное средство
  type: ITransportType;         // Тип транспортного средства
  registrationNumber: string;   // Государственный регистрационный номер
  model?: string;               // Модель
  description?: string;         // Описание
  isEnabled: boolean;           // Доступна ли транспортное средство для назначения в заявки
  driverId: number;             // Идентификатор водителя по умолчанию
}
