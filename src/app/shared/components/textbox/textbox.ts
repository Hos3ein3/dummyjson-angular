import { Component, forwardRef, Injector, Input, OnInit, Optional, Self } from '@angular/core';
import { Label, LabelOptions } from '@shared/components/label/label';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { BaseFieldOptions } from '@shared/forms/options/BaseFieldOptions';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.html',
  styleUrls: ['./textbox.css'],
  imports: [Label, NgClass, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBox),
      multi: true,
    },
  ],
})
export class TextBox implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options!: TextboxOptions;
  ngControl: NgControl | null = null;

  value = '';
  isDisabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
  get showSuccess(): boolean {
    return !!this.control && this.control.valid && (this.control.touched || this.control.dirty);
  }

  onBlur(): void {
    this.onTouched();
  }

  get control() {
    return this.ngControl?.control ?? null;
  }
  get isTouchedOrDirty(): boolean {
    return !!this.control && (this.control.touched || this.control.dirty);
  }
  get showError(): boolean {
    return !!this.control && this.control.invalid && (this.control.touched || this.control.dirty);
  }

  get showHelperText(): boolean {
    return !!this.options.helperText && !this.showError;
  }

  get showWarning(): boolean {
    return !!this.options.warningText && !this.showError && !this.showSuccess;
  }

  get wrapperClasses(): Record<string, boolean> {
    return {
      'has-error': this.showError,
      'has-success': this.showSuccess,
      'has-warning': this.showWarning,
      [this.options.cssClass ?? '']: !!this.options.cssClass,
    };
  }

  get errorMessage(): string {
    const errors = this.control?.errors;
    if (!errors) return '';

    if (errors['required']) return 'This field is required.';
    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required.`;
    if (errors['maxlength'])
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed.`;
    if (errors['email']) return 'Please enter a valid email address.';
    if (errors['min']) return `Minimum value is ${errors['min'].min}.`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}.`;
    if (errors['pattern']) return 'The entered value format is invalid.';

    const firstKey = Object.keys(errors)[0];
    return errors[firstKey]?.message ?? 'Invalid value.';
  }

  protected readonly LabelOptions = LabelOptions;
}

export type TextboxType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export class TextboxOptions extends BaseFieldOptions{
  id?: string;
  name?: string;

  type: TextboxType = 'text';

  autocomplete?: string;

  helperText?: string;

  prefix?: string;
  suffix?: string;


  inputClass = 'glass-input';

  readonly = false;

  required = false;
withInputGroup=true;
warningText?: string;

  constructor(init?: Partial<TextboxOptions>) {
    super();
    Object.assign(this, init ?? {});
  }
}
