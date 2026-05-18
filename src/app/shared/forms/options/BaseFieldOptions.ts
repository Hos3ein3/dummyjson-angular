// shared/forms/options/base-field.options.ts
import { LabelOptions } from '@shared/components';

export abstract class BaseFieldOptions {
  label?: string | LabelOptions = '';
  placeholder?: string = '';
  hint?: string = ''; // helper text below the field
  cssClass?: string = ''; // extra wrapper class
  disabled?: boolean = false;

  constructor(init?: Partial<BaseFieldOptions>) {
    Object.assign(this, init);
  }
}
