import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';

import {  Store } from '@ngrx/store';

import { IApplicationState } from './ngrx/application.state';
import { SwitchToMobileMode } from './features/operative-situation/ngrx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public mobileQuery: MediaQueryList;
  private readonly  mobileQueryListener: () => void;
  title = 'operative-situation';

  constructor(
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly store: Store<IApplicationState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 991.98px)');
    this.mobileQueryListener = () => this.detector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.breakpoint.observe('(max-width: 1485px)').subscribe((result: BreakpointState) => {
      console.log('APP IS MOBILE NOW', result);
      this.store.dispatch(new SwitchToMobileMode(result.matches ? true : false));
    });
  }
}
