import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './components/start/start.component';
import { StartWrapperComponent } from './components/start-wrapper/start-wrapper.component';
import { ArticlesBlockComponent } from './components/articles-block/articles-block.component';
import { WeatherComponent } from './components/weather/weather.component';

@NgModule({
  declarations: [
    StartComponent,
    StartWrapperComponent,
    ArticlesBlockComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    StartRoutingModule
  ]
})
export class StartModule { }
