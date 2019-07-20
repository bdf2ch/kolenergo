import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSelectModule, MatFormFieldModule } from '@angular/material';

import { CompanySelectComponent } from './components/company-select/company-select.component';

@NgModule({
  declarations: [
    CompanySelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  exports: [
    CompanySelectComponent
  ]
})
export class CompanySelectModule { }
