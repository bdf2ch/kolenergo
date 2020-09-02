import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FilterManager, IUser, SearchFilter } from '@kolenergo/core';
import {
  ApplicationCalendarPeriodChange, ApplicationClearFilter, ApplicationClearFilters,
  ApplicationCloseSidebar,
  ApplicationLoadCalendarRequests,
  ApplicationOpenAddRequestDialog,
  ApplicationOpenFiltersDialog,
  ApplicationOpenSidebar,
  ApplicationOpenSignInDialog, ApplicationSearchChanged,
  ApplicationSelectDate,
  ApplicationSelectViewMode,
  ApplicationSetCompactMode, ApplicationSetFilters,
  IApplicationState,
  selectDate,
  selectFilters,
  selectIsCompactMode,
  selectIsLoading,
  selectIsSidebarOpened,
  selectSelectedDate,
  selectUser,
  selectViewMode
} from './ngrx';
import { EViewMode } from './enums';
import { selectCalendarRequests } from './features/requests/ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public mobileQuery: MediaQueryList;
  private readonly  mobileQueryListener: () => void;
  isCompactMode$: Observable<boolean>;
  isSidebarOpened$: Observable<boolean>;
  idLoading$: Observable<boolean>;
  user$: Observable<IUser>;
  viewMode$: Observable<EViewMode>;
  viewModes = EViewMode;
  date$: Observable<Date>;
  selectedDate$: Observable<Date>;
  calendarRequests$: Observable<{date: string, count: number}[]>;
  filters$: Observable<FilterManager>;
  filters: FilterManager;

  constructor(
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly store: Store<IApplicationState>
  ) {
    this.isCompactMode$ = this.store.pipe(select(selectIsCompactMode));
    this.isSidebarOpened$ = this.store.pipe(select(selectIsSidebarOpened));
    this.date$ = this.store.pipe(select(selectDate));
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.idLoading$ = this.store.pipe(select(selectIsLoading));
    this.user$ = this.store.pipe(select(selectUser));
    this.viewMode$ = this.store.pipe(select(selectViewMode));
    this.calendarRequests$ = this.store.pipe(select(selectCalendarRequests));
    this.filters$ = this.store.pipe(select(selectFilters));
    this.filters$.subscribe((value: FilterManager) => {
      this.filters = value;
    });

    this.mobileQuery = media.matchMedia('(max-width: 1500px)');
    this.mobileQueryListener = () => this.detector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.breakpoint.observe('(max-width: 1500px)').subscribe((result: BreakpointState) => {
      this.store.dispatch(new ApplicationSetCompactMode(result.matches ? true : false));
    });
  }

  /**
   * Открытие боковой панели
   */
  openSidebar() {
    this.store.dispatch(new ApplicationOpenSidebar());
  }

  /**
   * закрытие боковой панели
   */
  closeSidebar() {
    this.store.dispatch(new ApplicationCloseSidebar());
  }

  /**
   * Выбор режима отображения заявок
   * @param mode - Режим отображения
   */
  selectViewMode(mode: EViewMode) {
    this.store.dispatch(new ApplicationSelectViewMode(mode));
  }

  /**
   * Открытие диалогового окна авторизации пользователя
   */
  openSignInDialog() {
    this.store.dispatch(new ApplicationOpenSignInDialog(false));
  }

  /**
   * Открытие диалогового окна добавления новой заявки
   */
  openAddRequestDialog() {
    this.store.dispatch(new ApplicationOpenAddRequestDialog());
  }

  /**
   * Выбор даты
   * @param date - Выбранная дата
   */
  selectDate(date: Date) {
    this.store.dispatch(new ApplicationSelectDate(date));
  }

  /**
   * Изменение периода календаря
   * @param period - Период календаря
   */
  periodChange(period: {start: number, end: number}) {
    this.store.dispatch(new ApplicationCalendarPeriodChange(period));
  }

  /**
   * Изменение месяца в календаре
   * @param period - Период от начала до конца текущего календарного периода
   */
  monthChange(period: {start: number, end: number}) {
    this.store.dispatch(new ApplicationCalendarPeriodChange({start: period.start, end: period.end}));
    this.store.dispatch(new ApplicationLoadCalendarRequests({start: period.start, end: period.end}));
  }

  /**
   * Открытие диалогового окна с фильтрами заявок
   */
  openFiltersDialog() {
    this.store.dispatch(new ApplicationOpenFiltersDialog());
  }

  /**
   * Сброс фильтра заявок
   * @param filter - Сбрасываемый фильтр
   */
  resetFilter(filter: SearchFilter<any>) {
    this.filters.getFilterById(filter.getId()).reset();
    this.store.dispatch(this.filters.isFiltersApplied()
      ? new ApplicationClearFilter(this.filters.getFilters())
      : new ApplicationClearFilters()
    );
  }

  /**
   * Изменение строки поиска заявок
   * @param query - Строка поиска
   */
  searchChanged(query: string) {
    this.store.dispatch(new ApplicationSearchChanged(query));
  }
}
