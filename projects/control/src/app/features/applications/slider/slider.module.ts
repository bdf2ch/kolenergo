import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { SlideComponent } from './components/slide/slide.component';

@NgModule({
  declarations: [
    SliderComponent,
    SlideComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    SlideComponent
  ]
})
export class SliderModule { }
