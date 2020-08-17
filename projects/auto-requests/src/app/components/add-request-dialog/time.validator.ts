import { AbstractControl, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

export function minTime(time?: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const current = moment()
      .hours(parseInt((control.value as string).substr(0, 2), null))
      .minutes(parseInt((control.value as string).substr(3, 2), null));
    console.log('current time = ', current.format('HH:mm'));
    const min = time
      ? moment()
        .hours(parseInt(time.substr(0, 2), null))
        .minutes(parseInt(time.substr(3, 2), null))
      : moment();
    console.log('min time = ', min.format('HH:mm'));
    return current <= min ? {minTime: {value: control.value}} : null;
  };
}
