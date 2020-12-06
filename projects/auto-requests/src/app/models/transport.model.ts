import { IDepartment, Department } from '@kolenergo/core';
import { ITransport } from '../interfaces/transport.interface';
import { ITransportType } from '../interfaces/transport-type.interface';
import { TransportType } from './transport-type.model';

/**
 * Класс, реализующий интерфейс транспортного средства
 */
export class Transport implements ITransport {
  id: number;                   // Идентификатор
  department: IDepartment;      // Подразделение организации, к которому относится транспортное средство
  type: ITransportType;         // Тип транспортного средства
  registrationNumber: string;   // Государственный регистрационный номер
  model: string;                // Модель
  description: string;          // Описание
  isEnabled: boolean;           // Доступно ли транспортное средство для назначения в заявки
  driverId: number;             // Идентификатор водителя по умолчанию

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ITransport) {
    this.id = config ? config.id : null;
    this.department = config ? new Department(config.department) : null;
    this.type = config ? new TransportType(config.type) : null;
    this.registrationNumber = config ? config.registrationNumber : null;
    this.model = config && config.model ? config.model : null;
    this.description = config && config.description ? config.description : null;
    this.isEnabled = config ? config.isEnabled : true;
    this.driverId = config ? config.driverId : null;
  }
}
