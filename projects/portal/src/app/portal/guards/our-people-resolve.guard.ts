import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../ngrx';
import { ArticlesSelectSection, selectSectionById } from '../../articles/ngrx';
import { ArticleSection } from '../../articles/models';

@Injectable({
  providedIn: 'root'
})
export class OurPeopleResolveGuard implements Resolve<boolean> {
  private section$: Observable<ArticleSection>;
  private section: ArticleSection;

  constructor(private readonly store: Store<IApplicationState>) {
    this.section = null;
    this.section$ = this.store.pipe(select(selectSectionById, {sectionId: 1}));
    this.section$.subscribe((value: ArticleSection) => {
      this.section = value;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(new ArticlesSelectSection(this.section));
    return true;
  }
}
