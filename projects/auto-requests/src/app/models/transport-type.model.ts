import { ITransportType } from '../interfaces/transport-type.interface';

/**
 * Класс, реализующий интерфейс типа транспортного средства
 */
export class TransportType implements ITransportType {
  id: number;                       // Идентификатор
  title: string;                    // Наименование
  description: string;              // Описание
  imageUrl: string;                 // URL изображения
  isForeignKeyRequired: boolean;    // Требуется ли идентификатор из внешнего источника при подаче заявки на этот тип транспортного средства

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ITransportType) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.description = config && config.description ? config.description : null;
    this.imageUrl = config && config.imageUrl ? config.imageUrl : null;
    this.isForeignKeyRequired = config ? config.isForeignKeyRequired : false;
  }
}
