import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './components/start/start.component';
import { StartWrapperComponent } from './components/start-wrapper/start-wrapper.component';
import { ArticlesBlockComponent } from './components/articles-block/articles-block.component';

@NgModule({
  declarations: [
    StartComponent,
    StartWrapperComponent,
    ArticlesBlockComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})
export class StartModule { }
