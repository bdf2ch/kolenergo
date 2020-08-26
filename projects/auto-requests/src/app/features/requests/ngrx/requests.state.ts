import { Request } from '../../../models';

/**
 * Интерфейс, описывающий состояние заявок на автотранспорт
 */
export interface IRequestsState {
  periodStart: number;                                  // Время начала периода в формате Unix
  periodEnd: number;                                    // Время окончания периода в формате Unix
  requests: Request[];                                  // Заявки
  userRequests: Request[];                              // Заявки текущего пользователя
  filteredRequests: Request[];                          // Отфильтрованные заявки
  calendarRequests: {date: string, count: number}[];    // Календарные индикаторы заявок
  selectedRequest: Request;                             // Текущая заявка
}

/**
 * Начальное состояние заявок на автотранспорт
 */
export const requestsInitialState: IRequestsState = {
  periodStart: 0,
  periodEnd: 0,
  requests: [],
  userRequests: [],
  filteredRequests: [],
  calendarRequests: [],
  selectedRequest: null
};
