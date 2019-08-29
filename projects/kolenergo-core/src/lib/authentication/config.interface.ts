/**
 * Интерфейс, описывающий конфигурацию модуля авторизации
 */
export interface IAuthenticationModuleConfig {
  apiUrl: string;
  pathPrefix: string;
  appCode?: string;
}
