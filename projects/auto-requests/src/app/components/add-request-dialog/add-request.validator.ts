import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

export const addRequestValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const date = control.get('date');
  const start = control.get('startTime');
  const end = control.get('endTime');
  const now = moment();

  const startTime = moment(date.value)
    .hours(parseInt((start.value as string).substr(0, 2), null))
    .minutes(parseInt((start.value as string).substr(3, 2), null));
  const endTime = moment(date.value)
    .hours(parseInt((end.value as string).substr(0, 2), null))
    .minutes(parseInt((end.value as string).substr(3, 2), null));

  if (startTime >= endTime || startTime < now) {
    start.setErrors({time: true});
    end.setErrors({time: true});
  } else {
    start.setErrors(null);
    end.setErrors(null);
  }

  return startTime < endTime ? null : {requestDuration: true};
};
