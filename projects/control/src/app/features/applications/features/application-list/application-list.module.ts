import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationListRoutingModule } from './application-list-routing.module';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ButtonModule } from '../../button/button.module';
import { TabbedFormModule } from '../../tabbed-form/tabbed-form.module';
import { SliderModule } from '../../slider/slider.module';

@NgModule({
  declarations: [ApplicationListComponent],
  imports: [
    CommonModule,
    ApplicationListRoutingModule,
    ButtonModule,
    TabbedFormModule,
    SliderModule
  ]
})
export class ApplicationListModule { }
