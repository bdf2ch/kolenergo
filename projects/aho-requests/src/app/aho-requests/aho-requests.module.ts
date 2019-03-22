import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { AhoRequestsRoutingModule } from './aho-requests-routing.module';
import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { RequestsSearchComponent } from './components/requests-search/requests-search.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';

@NgModule({
  declarations: [AhoRequestsComponent, RequestsSearchComponent, RequestsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AhoRequestsRoutingModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class AhoRequestsModule { }
