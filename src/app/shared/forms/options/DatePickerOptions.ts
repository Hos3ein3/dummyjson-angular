// shared/forms/options/datepicker.options.ts


import { BaseFieldOptions } from './BaseFieldOptions';

export class DatePickerOptions extends BaseFieldOptions {
  minDate?: Date;
  maxDate?: Date;
  format: string = 'YYYY-MM-DD';
  showTodayButton: boolean = true;
  disableWeekends: boolean = false;
  disabledDates?: Date[]; // specific blocked dates

  constructor(init?: Partial<DatePickerOptions>) {
    super();
    Object.assign(this, init);
  }
}
