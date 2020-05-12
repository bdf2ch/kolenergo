import { IUser, User } from '@kolenergo/core';
import { IChat } from '../interfaces/chat.interface';
import { IMessage } from '../interfaces/message.interface';
import { Message } from './message.model';

/**
 * Класс, описывающий беседу
 */
export class Chat {
  id: number;             // Идентификатор
  owner: User;            // Владелец
  title?: string;         // Наименование
  initials: string;       // Инициалы автара
  members: User[];        // Участники
  messages: Message[];    // Сообщения
  lastMessage: Message;   // Последнее сообщение
  dateCreated: Date;      // Дата и время создания в формате Unix
  dateModified: Date;     // Дата и время изменения в формате Unix

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IChat) {
    this.id = config ? config.id : null;
    this.owner = config ? new User(config.members.find((member: IUser) => member.id === config.ownerId)) : null;
    this.title = config ? config.title : null;
    this.initials = this.title ? this.getChatInitials() : this.owner.getInitials();
    this.members = config ? config.members.map((user: IUser) => new User(user)) : [];
    this.messages = config ? config.messages.map((message: IMessage) => new Message(message)) : [];
    this.lastMessage = this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateModified = config ? new Date(config.dateModified) : null;
  }

  fromAnotherWithMessages(chat: Chat, messages: IMessage[]): Chat {
    this.id = chat.id;
    this.owner = chat.owner;
    this.title = chat.title;
    this.initials = chat.initials;
    this.members = chat.members;
    this.messages = [...chat.messages, ...messages.map((msg: IMessage) => new Message(msg))];
    this.lastMessage = chat.lastMessage;
    this.dateCreated = chat.dateCreated;
    this.dateModified = chat.dateModified;
    return this;
  }

  /**
   * Поиск информации об авторе сообщения
   * @param message - Сообщение, авторв которого необходимо найти
   */
  getMessageAuthor(message: Message) {
    const userId = this.messages.find((msg: Message) => msg.id === message.id).userId;
    return this.members.find((user: User) => user.id === userId);
  }

  getChatInitials(): string {
    const letters = 'абвгдеёжзиклмнопрстуфхцчшщыэюя';
    let result = '';
    if (this.title) {
      const words = this.title.split(' ');
      if (words.length > 1) {
        words.forEach((word: string, index: number) => {
          word.split('').forEach((letter: string) => {
            if (letters.indexOf(letter.toLowerCase()) !== -1) {
              if (result.length === 1 ) {
                return;
              } else {
                result += letter;
              }
            }
          });
        });
      } else {
        this.title.split('').forEach((letter: string) => {
          if (letters.indexOf(letter.toLowerCase()) !== -1) {
            result += letter;
            if (result.length === 2) {
              return;
            }
          }
        });
      }
    }
    return result;
  }
}
