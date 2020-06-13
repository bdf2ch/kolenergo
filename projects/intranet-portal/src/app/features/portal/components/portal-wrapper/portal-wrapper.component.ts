import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';

import {select, Store} from '@ngrx/store';
import {
  ApplicationChangeViewMode,
  ApplicationCloseSidebar,
  ApplicationOpenSidebar,
  IApplicationState,
  selectSidebarOpened
} from '../../../../ngrx';
import {Observable} from 'rxjs';
import {EViewMode} from '../../../../enums/view-mode.enum';


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
    this.sideBarOpened$ = this.store.pipe(select(selectSidebarOpened));
    this.breakpoint.observe(
      [
        '(min-width: 500px)',  '(max-width: 576px)',
        '(min-width: 576px)',  '(max-width: 768px)',
        '(min-width: 768px)',  '(max-width: 992px)',
        '(min-width: 992px)',  '(max-width: 1200px)',
        '(min-width: 1200px)', '(max-width: 1700px)',
        '(min-width: 1700px)'
      ]
    ).subscribe((result: BreakpointState) => {
        console.log(result.breakpoints);
        if (result.breakpoints['(min-width: 500px)'] === true && result.breakpoints['(max-width: 576px)'] === true) {
          console.log('S');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.SMALL));
        }
        if (result.breakpoints['(min-width: 576px)'] === true && result.breakpoints['(max-width: 768px)'] === true) {
          console.log('M');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.MEDIUM));
        }
        if (result.breakpoints['(min-width: 768px)'] === true && result.breakpoints['(max-width: 992px)'] === true) {
          console.log('L');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.LARGE));
        }
        if (result.breakpoints['(min-width: 992px)'] === true && result.breakpoints['(max-width: 1200px)'] === true) {
          console.log('XL');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.EXTRA_LARGE));
        }
      if (result.breakpoints['(min-width: 1200px)'] === true && result.breakpoints['(max-width: 1700px)'] === true) {
        console.log('XXL');
        this.store.dispatch(new ApplicationChangeViewMode(EViewMode.EXTRA_EXTRA_LARGE));
      }
        if (result.breakpoints['(min-width: 1700px)'] === true) {
          console.log('XXXL');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.EXTRA_EXTRA_EXTRA_LARGE));
        }
      });
  }

  ngOnInit() {}

}
