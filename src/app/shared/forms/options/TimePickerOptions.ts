import { BaseFieldOptions } from './BaseFieldOptions';

export class TimePickerOptions extends BaseFieldOptions {
  minTime?: string; // '08:00'
  maxTime?: string; // '18:00'
  format: '12h' | '24h' = '24h';
  step: number = 15; // minute interval: 5, 15, 30, 60

  constructor(init?: Partial<TimePickerOptions>) {
    super();
    Object.assign(this, init);
  }
}
