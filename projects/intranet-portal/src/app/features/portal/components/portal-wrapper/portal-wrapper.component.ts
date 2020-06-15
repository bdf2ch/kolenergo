import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EViewMode } from '../../../../enums';
import { IApplicationState } from '../../../../ngrx';
import { PortalChangeViewMode, PortalToggleSidebar, selectIsSidebarOpened } from '../../ngrx';


@Component({
  selector: 'app-portal-wrapper',
  templateUrl: './portal-wrapper.component.html',
  styleUrls: ['./portal-wrapper.component.less']
})
export class PortalWrapperComponent implements OnInit {
  public sideBarOpened$: Observable<boolean>;

  constructor(
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly store: Store<IApplicationState>
  ) {
    this.sideBarOpened$ = this.store.pipe(select(selectIsSidebarOpened));
    this.breakpoint.observe(
      [
        '(min-width: 500px)',  '(max-width: 576px)',
        '(min-width: 576px)',  '(max-width: 768px)',
        '(min-width: 768px)',  '(max-width: 992px)',
        '(min-width: 992px)',  '(max-width: 1200px)',
        '(min-width: 1200px)', '(max-width: 1720px)',
        '(min-width: 1720px)'
      ]
    ).subscribe((result: BreakpointState) => {
      console.log(result.breakpoints);
      if (result.breakpoints['(min-width: 500px)'] === true && result.breakpoints['(max-width: 576px)'] === true) {
        console.log('S');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.SMALL));
      }
      if (result.breakpoints['(min-width: 576px)'] === true && result.breakpoints['(max-width: 768px)'] === true) {
        console.log('M');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.MEDIUM));
      }
      if (result.breakpoints['(min-width: 768px)'] === true && result.breakpoints['(max-width: 992px)'] === true) {
        console.log('L');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.LARGE));
      }
      if (result.breakpoints['(min-width: 992px)'] === true && result.breakpoints['(max-width: 1200px)'] === true) {
        console.log('XL');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.EXTRA_LARGE));
      }
      if (result.breakpoints['(min-width: 1200px)'] === true && result.breakpoints['(max-width: 1720px)'] === true) {
        console.log('XXL');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.EXTRA_EXTRA_LARGE));
        // this.store.dispatch(new PortalToggleSidebar());
      }
      if (result.breakpoints['(min-width: 1720px)'] === true) {
        console.log('XXXL');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.EXTRA_EXTRA_EXTRA_LARGE));
      }
      /*
      if (result.breakpoints['(max-width: 1200px)'] === true) {
        console.log('side bar');
        this.store.dispatch(new PortalToggleSidebar());
      }

       */
    });
  }

  ngOnInit() {}

}
