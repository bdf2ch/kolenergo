import { ICopter } from './copter.interface';
import { IEmployee } from './employee.interface';
import { IEmployeeRole } from './employee-role.interface';
import { IRequestStatus } from './request-status.interface';
import { IRequest } from './request.interface';

/**
 * Интерфейс, описывающий набор данных для инициализации приложения
 */
export interface IInitialData {
  employees: IEmployee[];         // Список сотрудников
  roles: IEmployeeRole[];         // Список ролей сотрудников
  copters: ICopter[];             // Список коптеров
  statuses: IRequestStatus[];     // Список статусов заявки
  requests: IRequest[];           // Список заявок
}
