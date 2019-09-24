import { IAdvert } from '../../adverts/interfaces';
import { IArticleSection } from '../../articles/interfaces';

/**
 * Интерфейс, описывающий набор данных для инициализации приложения
 */
export interface IPortalInitialData {
  adverts: {
    adverts: IAdvert[],           // Объявления на главной старнице
    total: number                 // Общее количество объявлений
  };
  articles: {
    sections: IArticleSection[]   // Разделы статей
  };
}
