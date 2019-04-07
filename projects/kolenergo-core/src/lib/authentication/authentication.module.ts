import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ResourceModule } from '@ngx-resource/handler-ngx-http';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationResource } from './resources/authentication.resource';
import { IAuthenticationModuleConfig } from './config.interface';
import { reducer } from './state/authentication.reducer';
import { AuthenticationEffects } from './state/authentication.effects';

export const AuthenticationConfigService = new InjectionToken<IAuthenticationModuleConfig>('AuthenticationConfig');

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    ResourceModule.forChild(),
    StoreModule.forFeature('session', reducer),
    EffectsModule.forFeature([AuthenticationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
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
