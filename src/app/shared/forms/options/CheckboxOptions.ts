// shared/forms/options/checkbox.options.ts


import { BaseFieldOptions } from './BaseFieldOptions';

export class CheckboxOptions extends BaseFieldOptions {
  checkboxLabel: string = ''; // the text next to the checkbox
  trueValue: any = true;
  falseValue: any = false;

  constructor(init?: Partial<CheckboxOptions>) {
    super();
    Object.assign(this, init);
  }
}
