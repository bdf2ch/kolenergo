import { AbstractControl, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

export function endTime(date: Date, startTime: string): ValidatorFn {
  console.log(moment(date).format('DD.MM.YYYY'));
  return (control: AbstractControl): {[key: string]: any} | null => {
    const current = moment(date)
      .hours(parseInt((control.value as string).substr(0, 2), null))
      .minutes(parseInt((control.value as string).substr(3, 2), null));
    const start = moment(date)
      .hours(parseInt(startTime.substr(0, 2), null))
      .minutes(parseInt(startTime.substr(3, 2), null));
    return current <= start ? {endTime: {value: control.value}} : null;
  };
}
