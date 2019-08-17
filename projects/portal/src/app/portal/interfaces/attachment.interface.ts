/**
 * Интерфейс, описывающий вложение
 */
export interface IAttachment {
  id: number;             // Идентификатор
  advertId?: number;      // Идентификатор объявления
  articleId?: number;     // Идентификатор статьи
  userId: number;         // Идентфикатор пользователя, загрузившего вложение
  url: string;            // URL файла во вложении
  size: number;           // Размер файла во вложении
  dateCreated: number;    // Дата и время создания записи в формате Unix
}
