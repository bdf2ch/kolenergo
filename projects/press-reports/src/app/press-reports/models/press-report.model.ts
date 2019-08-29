import { IPressReport } from '../interfaces/press-report.interface';
import { ICompany, IUser, Company, User } from '@kolenergo/core';
import * as moment from 'moment';

/**
 * Класс, реализующий интерфейс отчет о публикациях в СМИ
 */
export class PressReport implements IPressReport {
  id: number;                     // Идентификатор
  publicationsTotal: number;      // Общее количество публикаций
  publicationsNegative: number;   // Количество негативных публикаций
  date: string;                   // Дата отчета в формате ДД.ММ.ГГГГ
  dateD: Date;                    // Дата отчета
  company: ICompany;              // ОЛрганизация
  user: IUser;                    // Пользователь, разместивший отчет
  dateCreated: number;            // Дата и время создания отчета в формате Unix
  dateCreatedD: Date;             // Дата и время создания отчета
  dateModified: number;           // Дата и время изменения отчета в формате Unix
  dateModifiedD: Date;            // Дата и время изменения отчета

  /**
   * Конструктор
   * @param config - Параметрв инициализации
   */
  constructor(config?: IPressReport) {
    this.id = config ? config.id : null;
    this.publicationsTotal = config ? config.publicationsTotal : 0;
    this.publicationsNegative = config ? config.publicationsNegative : 0;
    this.date = config ? config.date : null;
    this.dateD = config ? moment(config.date, 'DD.MM.YYYY').toDate() : null;
    this.company = config ? new Company(config.company) : null;
    this.user = config ? new User(config.user) : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateCreated = config ? config.dateModified : null;
    this.dateModifiedD = config ? new Date(config.dateModified) : null;
  }
}
