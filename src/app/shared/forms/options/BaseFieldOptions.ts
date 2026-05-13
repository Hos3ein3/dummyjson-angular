// shared/forms/options/base-field.options.ts
export abstract class BaseFieldOptions {
  label?: string = '';
  placeholder?: string = '';
  hint?: string = ''; // helper text below the field
  cssClass?: string = ''; // extra wrapper class
  disabled?: boolean = false;

  constructor(init?: Partial<BaseFieldOptions>) {
    Object.assign(this, init);
  }
}
