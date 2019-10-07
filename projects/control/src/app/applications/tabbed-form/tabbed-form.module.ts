import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedFormComponent } from './components/tabbed-form/tabbed-form.component';
import { FormTabComponent } from './components/form-tab/form-tab.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    TabbedFormComponent,
    FormTabComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    TabbedFormComponent,
    FormTabComponent
  ]
})
export class TabbedFormModule { }
