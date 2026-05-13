import { BaseFieldOptions } from './BaseFieldOptions';

export class DateRangeOptions extends BaseFieldOptions {
  minDate?: Date;
  maxDate?: Date;
  maxRangeDays?: number; // max span between start & end
  startLabel: string = 'From';
  endLabel: string = 'To';
  format: string = 'YYYY-MM-DD';

  constructor(init?: Partial<DateRangeOptions>) {
    super();
    Object.assign(this, init);
  }
}
