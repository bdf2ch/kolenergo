/**
 * Интерфейс, описывающий состояние заявок на автотранспорт
 */
export interface IRequestsState {
  periodStart: number;      // Время начала периода в формате Unix
  periodEnd: number;        // Время окончания периода в формате Unix
  requests: Request[];      // Заявки
}

/**
 * Начальное состояние заявок на автотранспорт
 */
export const requestsInitialState: IRequestsState = {
  periodStart: 0,
  periodEnd: 0,
  requests: []
};
