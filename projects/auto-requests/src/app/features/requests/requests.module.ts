import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsWrapperComponent } from './components/requests-wrapper/requests-wrapper.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RequestsGridComponent } from './components/requests-grid/requests-grid.component';


@NgModule({
  declarations: [
    RequestsWrapperComponent,
    RequestsListComponent,
    TabsComponent,
    RequestsGridComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MatIconModule
  ]
})
export class RequestsModule { }
