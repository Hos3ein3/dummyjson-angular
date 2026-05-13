import { BaseFieldOptions } from './BaseFieldOptions';

export class ReadonlyFieldOptions extends BaseFieldOptions {
  copyable?: boolean = false; // future: click to copy

  constructor(init?: Partial<ReadonlyFieldOptions>) {
    super();
    Object.assign(this, init);
  }
}
