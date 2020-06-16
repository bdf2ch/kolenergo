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
        '(min-width: 500px)', '(max-width: 576px)',
        '(min-width: 576px)', '(max-width: 768px)',
        '(min-width: 768px)', '(max-width: 992px)',
        '(min-width: 992px)', '(max-width: 1200px)',
        '(min-width: 1200px)', '(max-width: 1450px)',
        '(min-width: 1450px)', '(max-width: 1600px)',
        '(min-width: 1600px)', '(max-width: 1850px)',
        '(min-width: 1850px)'
      ]
    ).subscribe((result: BreakpointState) => {
      console.log(result.breakpoints);
      if (result.breakpoints['(min-width: 500px)'] === true && result.breakpoints['(max-width: 576px)'] === true) {
        console.log('XXS');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.XXS));
      }
      if (result.breakpoints['(min-width: 576px)'] === true && result.breakpoints['(max-width: 768px)'] === true) {
        console.log('XS');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.XS));
      }
      if (result.breakpoints['(min-width: 768px)'] === true && result.breakpoints['(max-width: 992px)'] === true) {
        console.log('S');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.S));
      }
      if (result.breakpoints['(min-width: 992px)'] === true && result.breakpoints['(max-width: 1200px)'] === true) {
        console.log('M');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.M));
      }
      if (result.breakpoints['(min-width: 1200px)'] === true && result.breakpoints['(max-width: 1450px)'] === true) {
        console.log('L');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.L));
        // this.store.dispatch(new PortalToggleSidebar());
      }
      if (result.breakpoints['(min-width: 1450px)'] === true && result.breakpoints['(max-width: 1600px)'] === true) {
        console.log('XL');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.XL));
        // this.store.dispatch(new PortalToggleSidebar());
      }
      if (result.breakpoints['(min-width: 1600px)'] === true && result.breakpoints['(max-width: 1850px)'] === true) {
        console.log('XXL');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.XXL));
      }
      if (result.breakpoints['(min-width: 1850px)'] === true) {
        console.log('XXXL');
        this.store.dispatch(new PortalChangeViewMode(EViewMode.XXXL));
      }
    });


    this.breakpoint.observe(['(max-width: 1450px)']).subscribe((result: BreakpointState) => {
      console.log('side bar');
      this.store.dispatch(new PortalToggleSidebar(result.breakpoints['(max-width: 1450px)']));
    });
  }

  ngOnInit() {}

}
