import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';


import { StoreModule } from '@ngrx/store';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationResource } from './resources/authentication.resource';
import { IAuthenticationModuleConfig } from './config.interface';
import { reducer } from './state/authentication.reducer';
import { AppEffects } from './state/app.effects';

export const AuthenticationConfigService = new InjectionToken<IAuthenticationModuleConfig>('AuthenticationConfig');

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    StoreModule.forFeature('session', reducer),
    EffectsModule.forFeature([AppEffects])
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
