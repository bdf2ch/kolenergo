/**
 * Интерфейс, описывающий изображение
 */
export interface IImage {
  id: number;             // Идентификатор
  chatId: number;         // Идентификатор беседы
  messageId: number;      // Идентификатор сообщения
  userId: number;         // Идентификатор пользователя, загрузившего файл
  title: string;          // Наименование
  description: string;    // Описание
  size: number;           // Размер файла в байтах
  dateCreated: number;    // Дата и время загрузки файла в формате Unix
}
