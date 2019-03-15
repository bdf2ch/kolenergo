import { IAhoRequestType } from '../interfaces/aho-request-type.interface';

/**
 * Класс, реализующий тип заявки АХО
 */
export class AhoRequestType implements IAhoRequestType {
  id: number;
  title: string;
}
