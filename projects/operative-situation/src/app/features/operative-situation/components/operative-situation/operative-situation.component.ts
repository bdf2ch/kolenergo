import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatSelectChange } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AuthenticationSignOut, ICompany, User } from '@kolenergo/core';
import { IApplicationState } from '../../../../ngrx';
import {
  CloseSidebar,
  ExportReport,
  OpenSidebar,
  selectCompanies,
  SelectCompany,
  selectDate,
  selectLoadingInProgress,
  selectMobileMode,
  selectReports,
  selectSelectedCompany,
  selectSelectedDivision,
  selectSelectedReport,
  selectSelectedTime,
  selectSidebarOpened,
  SelectTime,
  selectUser,
  SwitchToMobileMode
} from '../../ngrx';
import { IDivision } from '../../../../interfaces';
import { Report, ReportSummary, TimeMark } from '../../../../models';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';

@Component({
  selector: 'app-operative-situation',
  templateUrl: './operative-situation.component.html',
  styleUrls: ['./operative-situation.component.less']
})
export class OperativeSituationComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private readonly  mobileQueryListener: () => void;
  public user$: Observable<User>;
  public date$: Observable<Date>;
  public companies$: Observable<ICompany[]>;
  public reports$: Observable<ReportSummary>;
  public selectedCompany$: Observable<ICompany>;
  public selectedDivision$: Observable<IDivision>;
  public selectedTime$: Observable<TimeMark>;
  public selectedReport$: Observable<Report>;
  public isLoadingInProgress$: Observable<boolean>;
  public isMobileMode$: Observable<boolean>;
  public isSidebarOpened$: Observable<boolean>;
  public selectedCompany: ICompany;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>,
    private breakpoint: BreakpointObserver,
    private readonly detector: ChangeDetectorRef,
    private readonly media: MediaMatcher,
  ) {
    this.user$ = this.store.pipe(select(selectUser));
    this.date$ = this.store.pipe(select(selectDate));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.reports$ = this.store.pipe(select(selectReports));
    this.selectedCompany$ = this.store.pipe(select(selectSelectedCompany));
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.selectedTime$ = this.store.pipe(select(selectSelectedTime));
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
    this.isLoadingInProgress$ = this.store.pipe(select(selectLoadingInProgress));
    this.isMobileMode$ = this.store.pipe(select(selectMobileMode));
    this.isSidebarOpened$ = this.store.pipe(select(selectSidebarOpened));

    this.mobileQuery = media.matchMedia('(max-width: 991.98px)');
    this.mobileQueryListener = () => this.detector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.breakpoint.observe('(max-width: 1485px)').subscribe((result: BreakpointState) => {
      this.store.dispatch(new SwitchToMobileMode(result.matches ? true : false));
    });
  }

  ngOnInit() {
    this.selectedCompany$.subscribe((value: ICompany) => {
      if (value) {
        this.selectedCompany = value;
      }
    });
  }

  /**
   * Выбор текущей организации
   * @param company - Текущая организация
   */
  selectCompany(company: ICompany) {
    this.store.dispatch(new SelectCompany(company));
  }

  /**
   * Выбор времени отчета
   * @param event - Событие выбора элемента выпадающего списка
   */
  selectTime(event: MatSelectChange) {
    console.log(event);
    this.store.dispatch(new SelectTime(new TimeMark(0, event.value, false)));
  }

  /**
   * Открытие диалогового окна добавления отчета об оперативной обстановке
   */
  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      id: 'add-report-dialog',
      width: '850px',
      panelClass: 'form-step-dialog',
      backdropClass: 'add-report-backdrop'
    });
  }

  /**
   * Открытие диалогового окна изменения отчета об оперативной обстановке
   */
  openEditReportDialog() {
    this.dialog.open(ReportEditDialogComponent, {
      id: 'edit-report-dialog',
      width: '850px',
      panelClass: 'form-step-dialog',
      backdropClass: 'edit-report-backdrop'
    });
  }

  /**
   * Загрузка отчета по организации
   */
  loadReportByCompany() {
    this.store.dispatch(new SelectCompany(this.selectedCompany));
  }

  /**
   * Экспорт текущего отчета об оперативной обстановке в Excel
   */
  exportReport() {
    this.store.dispatch(new ExportReport());
  }

  /**
   * Открытие боковой панели
   */
  openSideBar() {
    this.store.dispatch(new OpenSidebar());
  }

  /**
   * Закрытие боковой панели
   */
  closeSideBar() {
    this.store.dispatch(new CloseSidebar());
  }

  /**
   * Завершение сессии пользователя
   */
  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }
}
