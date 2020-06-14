import { EViewMode } from '../../../enums';

/**
 * Интерфейс, описывающий сосотояние базового приложения портала
 */
export interface IPortalState {
  isLoading: boolean;
  isInitialised: boolean;
  isSidebarOpened: boolean;
  viewMode: EViewMode;
}

/**
 * Начальное состояние базового приложения портала
 */
export const portalInitialState: IPortalState = {
  isLoading: false,
  isInitialised: false,
  isSidebarOpened: true,
  viewMode: EViewMode.LARGE
};
