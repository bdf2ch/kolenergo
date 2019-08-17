import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventInterval, EventRequest, EventType} from '../../models';
import {IApplicationState, selectDate, selectEventTypes, selectIntervals, selectCompanies} from '../../../ngrx';
import {select, Store} from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import {take} from 'rxjs/operators';
import {MatSelectChange} from '@angular/material';
import {User, Company, Department} from '@kolenergo/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {EventShedulerService} from '../../services/event-sheduler.service';
import {FormStepManager} from '../../models/form-manager.model';
import {FormStep} from '../../models/form-step.model';

@Component({
  selector: 'app-request-add-dialog',
  templateUrl: './request-add-dialog.component.html',
  styleUrls: ['./request-add-dialog.component.less']
})
export class RequestAddDialogComponent implements OnInit, AfterContentInit {
  public companies$: Observable<Company[]>;
  private types$: Observable<EventType[]>;
  private intervals$: Observable<EventInterval[]>;
  private date$: Observable<Date>;
  public request: EventRequest;
  private addRequestFormCommon: FormGroup;
  private addRequestFormDuration: FormGroup;
  private minDate: Date;
  public host: (User | string)[];
  public formWithSteps: FormStepManager;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly detector: ChangeDetectorRef,
              private readonly builder: FormBuilder,
              private readonly esa: EventShedulerService) {
    this.formWithSteps = new FormStepManager();
    this.formWithSteps.addStep(new FormStep('О мероприятии', 'Основные сведения', 'info'));
    this.formWithSteps.addStep(new FormStep('Когда состоится', 'Дата и время проведения', 'access_time'));
    this.formWithSteps.addStep(new FormStep('Кто участвует', 'Участники мероприятия', 'supervised_user_circle'));
  }

  ngOnInit() {
    this.request = new EventRequest();
    this.companies$ = this.store.pipe(
      select(selectCompanies)
    );
    this.date$ = this.store.pipe(select(selectDate), take(1));
    this.types$ = this.store.pipe(select(selectEventTypes), take(1));
    this.intervals$ = this.store.pipe(
      select(selectIntervals),
      take(1)
    );
    this.date$.subscribe((date: Date) => {
      this.minDate = date;
    });
    this.types$.subscribe((types: EventType[]) => {
      this.request.type = types[0];
    });
    this.intervals$.subscribe((intervals: EventInterval[]) => {
      this.request.interval = intervals[0];
    });
    this.addRequestFormCommon = this.builder.group({
      type: new FormControl(this.request.type, Validators.required),
      subject: new FormControl(this.request.subject, Validators.required),
      description: new FormControl(this.request.description),
      needBoard: new FormControl(this.request.needBoard),
      needProjector: new FormControl(this.request.needProjector),
      numberOfParticipants: new FormControl(this.request.numberOfParticipants, Validators.required)
    });
    this.addRequestFormDuration = this.builder.group({
      date: new FormControl(this.request.dateD, Validators.required),
      startTime: new FormControl(this.request.startTime, Validators.required),
      endTime: new FormControl(this.request.endTime, Validators.required),
      isRegular: new FormControl(false),
      interval: new FormControl(this.request.interval)
    }, {validators: this.endTimeValidator()});
    this.host = [];

    this.addRequestFormCommon.statusChanges.subscribe((value: any) => {
      this.formWithSteps.steps[0].isValid = value === 'VALID' ? true : false;
      this.formWithSteps.steps[0].isInvalid = value === 'INVALID' ? true : false;
    });

    this.addRequestFormDuration.statusChanges.subscribe((value: any) => {
      this.formWithSteps.steps[1].isValid = value === 'VALID' ? true : false;
      this.formWithSteps.steps[1].isInvalid = value === 'INVALID' ? true : false;
    });
  }


  /**
   * Валидатор времени окончания мероприятия формы добавления заявки на мероприятие
   */
  endTimeValidator(): ValidatorFn {
    return (form: FormGroup): ValidationErrors | null => {
      const date = form.get('date');
      const startTime = form.get('startTime');
      const endTime = form.get('endTime');
      if (date.value && startTime.value && endTime.value) {
        const startTimeParsed = startTime.value.split(':');
        const start = moment(date.value)
          .hours(parseInt(startTimeParsed[0], null))
          .minutes(parseInt(startTimeParsed[1], null))
          .startOf('minute');
        const endTimeParsed = endTime.value.split(':');
        const end = moment(date.value)
          .hours(parseInt(endTimeParsed[0], null))
          .minutes(parseInt(endTimeParsed[1], null))
          .startOf('minute');
        if (start.unix() > end.unix() || start.unix() === end.unix()) {
          endTime.setErrors({invalidTime: true});
          return {invalidEndTime: {value: true}};
        } else {
          endTime.setErrors(null);
          return null;
        }
      } else {
        return null;
      }
    };
  }

  /**
   * Изменение периодичности повторения мероприятия
   * @param event -Событие изменения периодичности повторения мероприятия
   */
  intervalChange(event: MatSelectChange) {
    this.request.interval = event.value;
  }

  /**
   * Изменение перечня организаций, участвующих в мероприятии
   * @param value - Событие изменения списка организаций, участующих в мероприятии
   */
  selectCompany(value: {companies: Company[], departments: Department[]}) {
    this.request.companies = value.companies.length > 0 ? value.companies : [];
    this.request.departments = value.departments.length > 0 ? value.departments : [];
  }

  /**
   * Выбор организатора мероприятия
   * @param user - Организатор меропряития
   */
  selectHost(user: User | string) {
    if (user instanceof User) {
      this.host = new Array(user);
    } else {
      this.host = new Array(new User({
        id: 0,
        firstName: user.split(' ')[1],
        secondName: user.split(' ').length > 2 ? user.split(' ')[2] : '',
        lastName: user.split(' ')[0],
        position: null
      }));
    }
  }

  /**
   * Удаление организатора меропрития
   */
  removeHost() {
    this.host = [];
  }

  /**
   * Добавление участника мероприятия
   * @param participant - Участник мероприятия
   */
  selectParticipant(participant: User | string) {
    if (participant instanceof User) {
      this.request.participants = [...this.request.participants, participant];
    } else {
      const user = new User({
        id: new Date().getTime(),
        firstName: participant.split(' ')[1],
        secondName: participant.split(' ').length > 2 ? participant.split(' ')[2] : '',
        lastName: participant.split(' ')[0],
        position: null
      });
      this.request.participants = [...this.request.participants, user];
    }
  }

  /**
   * Удаление участника моероприятия
   * @param participant - Удаляемый участник мероприятия
   */
  removeParticipant(participant: User | string) {
    console.log('participant', participant);
    this.request.participants = this.request.participants.filter((item: User | string) => {
      return item.hasOwnProperty('id') && (item as User).id !== (participant as User).id ? true : false;
    });
  }

  addRequest() {

  }

  ngAfterContentInit(): void {
  }

}
