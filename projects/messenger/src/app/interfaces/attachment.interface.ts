/**
 * Интерфейс, описывающий вложение к сообщению
 */
export interface IAttachment {
  id: number;             // Идентификатор
  chatId: number;         // Идентификатор беседы
  messageId: number;      // Идентификатор сообщения
  userId: number;         // Идентификатор пользователя, загрузившего файл
  title: string;          // Наименование
  size: number;           // Размер файла в байтах
  dateCreated: number;    // Дата и время загрузки в формате Unix
}
