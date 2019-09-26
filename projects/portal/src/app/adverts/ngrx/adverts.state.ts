import { Advert } from '../models';

/**
 * Интерфейс, описывающий состояние раздела с объявлениями
 */
export interface IAdvertsState {
  adverts: Advert[];                        // Объявления
  templates: Advert[];                      // Шаблонные объявления
  selectedAdvert: Advert;                   // Текущее объявление
  newAdvert: Advert;                        // Новое объявление
  advertsOnPage: number;                    // Количество объявлений на странице
  totalAdverts: number;                     // Общее количество объявлений
  page: number;                             // Порядковый номер текущей страницы с объявлениями
  totalPages: number;                       // Общее количество страниц
  searchQuery: string;                      // Строка поиска
  fetchingInProgress: boolean;              // Выполняется ли загрузка объявлений с сервера
  addingInProgress: boolean;                // Выполняется ли добавление объявления
  editingInProgress: boolean;               // Выполняется ли сохранение измененного объявления
  deletingInProgress: boolean;              // Выполняется ли удалени объявления
  searchingInProgress: boolean;             // Выполняется ли поиск объявлений
  uploadingImageInProgress: boolean;        // Выполняется ли загрузка изображений на сервер
  deletingImageInProgress: boolean;         // Выполняется ли удаление изображения
  uploadingAttachmentInProgress: boolean;   // Выполняется ли загрузка вложения на сервер
  deletingAttachmentInProgress: boolean;    // Выполняется ли удалени вложения
}

/**
 * Начальное состояние раздела с объявлениями
 */
export const advertsInitialState: IAdvertsState = {
  adverts: [],
  templates: [],
  selectedAdvert: null,
  newAdvert: new Advert(),
  advertsOnPage: 12,
  totalAdverts: 0,
  page: 0,
  totalPages: 0,
  searchQuery: null,
  fetchingInProgress: false,
  addingInProgress: false,
  editingInProgress: false,
  deletingInProgress: false,
  searchingInProgress: false,
  uploadingImageInProgress: false,
  deletingImageInProgress: false,
  uploadingAttachmentInProgress: false,
  deletingAttachmentInProgress: false
};
