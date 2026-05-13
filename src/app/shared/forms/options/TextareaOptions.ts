import { BaseFieldOptions } from './BaseFieldOptions';

export class TextareaOptions extends BaseFieldOptions {
  rows: number = 4;
  maxLength?: number;
  resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  constructor(init?: Partial<TextareaOptions>) {
    super();
    Object.assign(this, init);
  }
}
