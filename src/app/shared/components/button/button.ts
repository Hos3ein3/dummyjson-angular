import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input({ required: true }) options!: ButtonOptions;
  @Input() hasProjectedContent = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string[] {
    return [
      this.getVariantClass(),
      this.getSizeClass(),
      this.options.rounded ? 'rounded-xl' : '',
      this.options.iconOnly ? 'btn-icon' : '',
      this.options.loading ? 'btn-loading' : '',
      this.options.cssClass ?? '',
    ].filter(Boolean);
  }

  handleClick(event: MouseEvent): void {
    if (this.options.disabled || this.options.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }

  private getVariantClass(): string {
    switch (this.options.variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'danger':
        return 'btn-danger';
      case 'ghost':
        return 'btn-ghost';
      case 'glass':
        return 'btn-glass';
      case 'glass-primary':
        return 'btn-glass-primary';
      case 'glass-success':
        return 'btn-glass-success';
      case 'glass-danger':
        return 'btn-glass-danger';
      case 'glass-warning':
        return 'btn-glass-warning';
      case 'glass-info':
        return 'btn-glass-info';
      case 'outline-primary':
        return 'btn-outline-primary';
      default:
        return 'btn-primary';
    }
  }

  private getSizeClass(): string {
    switch (this.options.size) {
      case 'sm':
        return 'btn-sm';
      case 'lg':
        return 'btn-lg';
      default:
        return '';
    }
  }
}


export class ButtonOptions {
  label = '';
  variant: ButtonVariant = 'primary';
  size: ButtonSize = 'md';
  type: ButtonType = 'button';

  disabled = false;
  loading = false;
  rounded = true;
  iconOnly = false;

  ariaLabel?: string;
  title?: string;
  cssClass?: string;

  constructor(init?: Partial<ButtonOptions>) {
    Object.assign(this, init ?? {});
  }
}

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'glass'
  | 'glass-primary'
  | 'glass-success'
  | 'glass-danger'
  | 'glass-warning'
  | 'glass-info'
  | 'outline-primary';
export type ButtonSize = 'sm' | 'md' | 'lg';

// shared/ui/button/models/button-type.type.ts
export type ButtonType = 'button' | 'submit' | 'reset';
