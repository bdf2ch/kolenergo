import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';

import { UserSearchModule } from '../user-search/user-search.module';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    UserSearchModule.forRoot({
      apiUrl: 'http://127.0.0.1:3000',
      pathPrefix: '/users'
    }),
  ],
  exports: [
    UserListComponent
  ]
})
export class UserListModule { }
