import { BaseFieldOptions } from './BaseFieldOptions';

export interface RadioOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export class RadioGroupOptions extends BaseFieldOptions {
  options: RadioOption[] = [];
  layout: 'horizontal' | 'vertical' = 'vertical';

  constructor(init?: Partial<RadioGroupOptions>) {
    super();
    Object.assign(this, init);
  }
}
