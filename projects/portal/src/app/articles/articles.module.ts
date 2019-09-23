import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesResource } from './resources/articles.resource';
import { ArticlesService } from './services/articles.service';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticlesSearchComponent } from './components/articles-search/articles-search.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ArticlesRoutingModule
  ],
  providers: [
    ArticlesResource,
    ArticlesService
  ]
})
export class ArticlesModule { }
