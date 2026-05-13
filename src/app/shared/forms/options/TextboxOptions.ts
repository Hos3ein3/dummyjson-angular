import { BaseFieldOptions } from './BaseFieldOptions';

export class TextboxOptions extends BaseFieldOptions {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  maxLength?: number;
  autocomplete?: string = 'off';

  constructor(init?: Partial<TextboxOptions>) {
    super();
    Object.assign(this, init);
  }
}
