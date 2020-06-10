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
  public mobileQuery: MediaQueryList;
  private readonly  mobileQueryListener: () => void;
  public sideBarOpened$: Observable<boolean>;

  constructor(
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly store: Store<IApplicationState>
  ) {
    this.sideBarOpened$ = this.store.pipe(select(selectSidebarOpened));
    //this.mobileQuery = media.matchMedia('(max-width: 991.98px)');
    //this.mobileQueryListener = () => this.detector.detectChanges();
    //this.mobileQuery.addListener(this.mobileQueryListener);
    this.breakpoint.observe(
      [
        '(min-width: 576px)',
        '(min-width: 768px)',
        '(min-width: 992px)',
        '(min-width: 1200px)',
        '(min-width: 1700px)',
        '(max-width: 1700px)'
      ])
      .subscribe((result: BreakpointState) => {
        // this.store.dispatch(new SwitchToMobileMode(result.matches ? true : false));
        console.log(result.breakpoints);

        if (
          result.breakpoints['(min-width: 576px)'] === false &&
          result.breakpoints['(min-width: 768px)'] === false &&
          result.breakpoints['(min-width: 992px)'] === false &&
          result.breakpoints['(min-width: 1200px)'] === false
        ) {
          console.log('S');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.SMALL));
        }

        if (
          result.breakpoints['(min-width: 576px)'] === true &&
          result.breakpoints['(min-width: 768px)'] === false &&
          result.breakpoints['(min-width: 992px)'] === false &&
          result.breakpoints['(min-width: 1200px)'] === false
        ) {
          console.log('M');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.MEDIUM));
        }

        if (
          result.breakpoints['(min-width: 576px)'] === true &&
          result.breakpoints['(min-width: 768px)'] === true &&
          result.breakpoints['(min-width: 992px)'] === false &&
          result.breakpoints['(min-width: 1200px)'] === false
        ) {
          console.log('L');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.LARGE));
        }

        if (
          result.breakpoints['(min-width: 768px)'] &&
          result.breakpoints['(max-width: 1200px)'] === true
        ) {
          console.log('XL');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.EXTRA_LARGE));
        }

        if (
          //result.breakpoints['(min-width: 576px)'] === true &&
          //result.breakpoints['(min-width: 768px)'] === true &&
          result.breakpoints['(min-width: 1700px)'] === false
        ) {
          console.log('XXL');
          this.store.dispatch(new ApplicationChangeViewMode(EViewMode.EXTRA_EXTRA_LARGE));
        }


      });


  }

  ngOnInit() {}

}
