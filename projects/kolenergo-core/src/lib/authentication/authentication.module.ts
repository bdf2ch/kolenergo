import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationResource } from './resources/authentication.resource';
import { IAuthenticationModuleConfig } from './config.interface';
import { reducer } from './state/authentication.reducer';

export const AuthenticationConfigService = new InjectionToken<IAuthenticationModuleConfig>('AuthenticationConfig');

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forFeature('session', reducer)
  ],
  entryComponents: [SignInComponent],
  exports: [SignInComponent]
})
export class AuthenticationModule {

  /**
   * Конфигурирование модуля
   * @param config - Параметры конфигурации модуля
   */
  static forRoot(config: IAuthenticationModuleConfig): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthenticationResource,
        {
          provide: AuthenticationConfigService,
          useValue: config
        }
      ],
    };
  }
}
