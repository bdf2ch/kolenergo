import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatTooltipModule, MatButtonModule } from '@angular/material';

import { SearchWithFiltersComponent } from './components/search-with-filters/search-with-filters.component';

@NgModule({
  declarations: [
    SearchWithFiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [
    SearchWithFiltersComponent
  ]
})
export class SearchWithFiltersModule { }
