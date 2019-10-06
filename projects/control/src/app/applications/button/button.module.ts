import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KolButtonDirective } from './directives/kol-button.directive';

@NgModule({
  declarations: [
    KolButtonDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    KolButtonDirective
  ]
})
export class ButtonModule { }
