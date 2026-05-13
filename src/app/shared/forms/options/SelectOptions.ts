import { BaseFieldOptions } from './BaseFieldOptions';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export class SelectOptions extends BaseFieldOptions {
  options: SelectOption[] = [];
  multiple: boolean = false;
  searchable: boolean = false;

  /**
   * When true  → shows a "-- None --" option at the top, value = null
   * When false → no empty option; first item is pre-selected if defaultToFirst is true
   */
  nullable: boolean = false;

  /**
   * The label shown for the empty/null option
   * Only used when nullable = true
   */
  nullLabel: string = '-- None --';

  /**
   * Shown as the greyed-out first option before user picks anything
   * Only used when nullable = false
   * Does NOT submit — it's just a visual prompt
   */
  override placeholder: string = 'Select an option';

  /**
   * When nullable = false and no value is set yet,
   * auto-select the first real option
   */
  defaultToFirst: boolean = false;

  constructor(init?: Partial<SelectOptions>) {
    super();
    Object.assign(this, init);
  }
}
