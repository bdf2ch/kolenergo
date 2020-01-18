import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesResource } from './resources/articles.resource';
import { ArticlesService } from './services/articles.service';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticlesSearchComponent } from './components/articles-search/articles-search.component';
import {StoreModule} from '@ngrx/store';
import { reducer } from '../ngrx';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';

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
    StoreModule.forFeature('articles', reducer),
    // EffectsModule.forFeature([AdvertsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ArticlesRoutingModule
  ],
  providers: [
    ArticlesResource,
    ArticlesService
  ]
})
export class ArticlesModule { }
