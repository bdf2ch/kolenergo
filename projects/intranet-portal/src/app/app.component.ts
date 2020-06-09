import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public mobileQuery: MediaQueryList;
  private readonly  mobileQueryListener: () => void;

  constructor(
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 991.98px)');
    this.mobileQueryListener = () => this.detector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.breakpoint.observe(['(max-width: 1100px)', '(max-width: 1500px)', '(max-width: 1750px)']).subscribe((result: BreakpointState) => {
      // this.store.dispatch(new SwitchToMobileMode(result.matches ? true : false));
      console.log(result.breakpoints);
    });
  }
}
