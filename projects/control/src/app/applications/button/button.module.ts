import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { KolButtonDirective } from './directives/kol-button.directive';

@NgModule({
  declarations: [
    KolButtonDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    KolButtonDirective
  ]
})
export class ButtonModule { }
