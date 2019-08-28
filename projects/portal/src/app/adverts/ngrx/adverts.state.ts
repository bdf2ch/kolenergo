import { Advert } from '../models';

/**
 * Интерфейс, описывающий состояние раздела с объявлениями
 */
export interface IAdvertsState {
  adverts: Advert[];                        // Объявления
  advertsOnPage: number;                    // Количество объявлений на странице
  totalAdverts: number;                     // Общее количество объявлений
  page: number;                             // Порядковый номер текущей страницы с объявлениями
  totalPages: number;                       // Общее количество страниц
  newAdvert: Advert;                        // Новое объявление
  searchQuery: string;                      // Строка поиска
  fetchingInProgress: boolean;              // Выполняется ли загрузка объявлений с сервера
  addingInProgress: boolean;                // Выполняется ли добавление объявления
  editingInProgress: boolean;               // Выполняется ли сохранение измененного объявления
  searchingInProgress: boolean;             // Выполняется ли поиск объявлений
  uploadingAttachmentInProgress: boolean;   // Выполняется ли загрузка вложения на сервер
}

/**
 * Начальное состояние раздела с объявлениями
 */
export const advertsInitialState: IAdvertsState = {
  adverts: [],
  advertsOnPage: 12,
  totalAdverts: 0,
  page: 0,
  totalPages: 0,
  newAdvert: new Advert(),
  searchQuery: null,
  fetchingInProgress: false,
  addingInProgress: false,
  editingInProgress: false,
  searchingInProgress: false,
  uploadingAttachmentInProgress: false
};
