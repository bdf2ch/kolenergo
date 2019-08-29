import { ICompany, IUser } from '@kolenergo/core';

/**
 * Интерфейс, описывающий отчет о публикациях в СМИ
 */
export interface IPressReport {
  id: number;                     // Идентификатор
  publicationsTotal: number;      // Общее количество публикаций
  publicationsNegative: number;   // Количество негативных публикаций
  date: string;                   // Дата отчета
  company: ICompany;              // ОЛрганизация
  user: IUser;                    // Пользователь, разместивший отчет
  dateCreated: number;            // Дата создания отчета
  dateModified: number;           // Дата изменения отчета
}
