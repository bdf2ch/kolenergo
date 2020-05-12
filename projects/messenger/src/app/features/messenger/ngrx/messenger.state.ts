import { Chat } from '../../../models';

/**
 * Интерфейс, описывающий состояние мессенджера
 */
export interface IMessengerState {
  isApplicationInitialised: boolean;    // Выполнена ли инициализация приложения
  isLoadingInProgress: boolean;         // Выполняется ли загрузка данных
  chats: Chat[];                        // Список бесед
  filteredChats: Chat[];                // Список отфильтрованных по поиску бесед
  selectedChat: Chat;                   // Текущая беседа
  chatSearchQuery: string;              // Строка поиска беседы
}

/**
 * Интерфейс, описывающий начальное состояние мессенджера
 */
export const MessengerInitialState: IMessengerState = {
  isApplicationInitialised: false,
  isLoadingInProgress: false,
  chats: [],
  filteredChats: [],
  selectedChat: null,
  chatSearchQuery: null
};

