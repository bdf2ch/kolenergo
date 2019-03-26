import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule
} from '@angular/material-moment-adapter';

import { AhoRequestsRoutingModule } from './aho-requests-routing.module';
import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { RequestsSearchComponent } from './components/requests-search/requests-search.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FiltersDialogComponent } from './components/filters-dialog/filters-dialog.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    AhoRequestsComponent,
    RequestsSearchComponent,
    RequestsListComponent,
    TabsComponent,
    FiltersDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AhoRequestsRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  entryComponents: [
    FiltersDialogComponent
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ]
})
export class AhoRequestsModule { }
