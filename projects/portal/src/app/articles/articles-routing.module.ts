import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './components/articles/articles.component';

const routes: Routes = [{
  path: '',
  component: ArticlesComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./articles-list/articles-list.module').then(m => m.ArticlesListModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
