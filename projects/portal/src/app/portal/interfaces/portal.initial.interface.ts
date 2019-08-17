import { IAdvert } from '../../adverts/interfaces';

export interface IPortalInitialData {
  adverts: IAdvert[];
  totalAdvertsCount: number;
}
