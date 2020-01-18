import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';

import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {
  IApplicationState,
  PhoneBookHideSidebarToggleButton,
  PhoneBookSetViewMode,
  PhoneBookShowSidebarToggleButton,
  selectFetchingInProgress
} from './ngrx';
import {EViewMode} from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  styles: [':host { display: flex; width: 100%; height: 100% }']
})
export class AppComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  private readonly  mobileQueryListener: () => void;
  public isFetchingInProgress$: Observable<boolean>;

  constructor(
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly store: Store<IApplicationState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 991.98px)');
    this.mobileQueryListener = () => this.detector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.breakpoint.observe(['(max-width: 767px)', '(max-width: 991.98px)']).subscribe((result: BreakpointState) => {
      console.log('APP IS MOBILE NOW', result);
      this.store.dispatch(
        new PhoneBookSetViewMode(
          result.breakpoints['(max-width: 767px)'] === true
            ? EViewMode.MOBILE_VIEW
            : result.breakpoints['(max-width: 991.98px)'] === true
            ? EViewMode.TABLET_VIEW
            : EViewMode.DESKTOP_VIEW
        ));
    });
  }

  ngOnInit() {
    this.isFetchingInProgress$ = this.store.pipe(select(selectFetchingInProgress));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  sideBarOpened() {
    console.log('sidebar opened');
    this.store.dispatch(new PhoneBookHideSidebarToggleButton());
  }

  sidebarClosed() {
    console.log('sidebar closed');
    this.store.dispatch(new PhoneBookShowSidebarToggleButton());
  }
}
