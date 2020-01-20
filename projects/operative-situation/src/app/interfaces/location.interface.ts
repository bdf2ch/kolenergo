import { ILocationWeather } from './location-weather.interface';

/**
 * Интерфейс, описывающий географическое местоположение точки погоднйо сводки
 */
export interface ILocation {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  coordinates: {
    x: number,                  // Широта
    y: number                   // Долгота
  };
  weather?: ILocationWeather;   // Погодная сводка
}
