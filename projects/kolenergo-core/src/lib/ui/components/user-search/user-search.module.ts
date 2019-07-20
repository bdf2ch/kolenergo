import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatIconModule, MatButtonModule } from '@angular/material';

import { ResourceModule } from '@ngx-resource/handler-ngx-http';

import { IUserSearchModuleConfig } from './config.interface';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserSearchResource } from './resources/user-search.resource';
import { UserSearchService } from './services/user-search.service';

export const UserSearchConfigService = new InjectionToken<IUserSearchModuleConfig>('UserSearchConfig');

@NgModule({
  declarations: [
    UserSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    ResourceModule.forChild()
  ],
  providers: [
    UserSearchResource,
    UserSearchService
  ],
  exports: [
    UserSearchComponent
  ]
})
export class UserSearchModule {
  /**
   * Конфигурирование модуля
   * @param config - Параметры конфигурации модуля
   */
  static forRoot(config: IUserSearchModuleConfig): ModuleWithProviders {
    return {
      ngModule: UserSearchModule,
      providers: [
        UserSearchResource,
        {
          provide: UserSearchConfigService,
          useValue: config
        }
      ],
    };
  }
}
