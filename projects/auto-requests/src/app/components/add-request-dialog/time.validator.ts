import { AbstractControl, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

export function minTime(date: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const current = moment(date)
      .hours(parseInt((control.value as string).substr(0, 2), null))
      .minutes(parseInt((control.value as string).substr(3, 2), null));
    const min = moment();
    return current <= min ? {minTime: {value: control.value}} : null;
  };
}
