import { Advert } from '../models';

/**
 * Интерфейс, описывающий состояние раздела с объявлениями
 */
export interface IAdvertsState {
  adverts: Advert[];                        // Объявления
  advertsOnPage: number;                    // Количество объявлений на странице
  page: number;                             // Порядковый номер текущей страницы с объявлениями
  newAdvert: Advert;                        // Новое объявление
  fetchingInProgress: boolean;              // Выполняется ли загрузка объявлений с сервера
  addingInProgress: boolean;                // Выполняется ли добавление объявления
  editingInProgress: boolean;               // Выполняется ли сохранение измененного объявления
  uploadingAttachmentInProgress: boolean;   // Выполняется ли загрузка вложения на сервер
}

/**
 * Начальное состояние раздела с объявлениями
 */
export const advertsInitialState: IAdvertsState = {
  adverts: [],
  advertsOnPage: 12,
  page: 0,
  newAdvert: new Advert(),
  fetchingInProgress: false,
  addingInProgress: false,
  editingInProgress: false,
  uploadingAttachmentInProgress: false
};
