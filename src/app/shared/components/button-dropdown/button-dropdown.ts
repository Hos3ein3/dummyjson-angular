import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Button, ButtonOptions } from '@shared/components/button/button';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-button-dropdown',
  imports: [Button, NgIf, NgForOf],
  templateUrl: './button-dropdown.html',
  styleUrl: './button-dropdown.css',
})
export class ButtonDropdown<T = any> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) options!: ButtonDropdownOptions<T>;

  @Output() primaryClick = new EventEmitter<MouseEvent>();
  @Output() itemClick = new EventEmitter<ButtonMenuItem<T>>();

  readonly isOpen = signal(false);

  get primaryButtonOptions(): ButtonOptions {
    return new ButtonOptions({
      ...this.options.triggerButton,
      rounded: false,
    });
  }

  get toggleButtonOptions(): ButtonOptions {
    return new ButtonOptions({
      ...this.options.triggerButton,
      label: '',
      rounded: false,
      cssClass: `${this.options.triggerButton.cssClass ?? ''}`.trim(),
    });
  }

  get singleButtonOptions(): ButtonOptions {
    return new ButtonOptions({
      ...this.options.triggerButton,
    });
  }

  toggleDropdown(): void {
    if (this.options.triggerButton.disabled || this.options.triggerButton.loading) return;
    this.isOpen.update((v) => !v);
  }

  onPrimaryClick(event: MouseEvent): void {
    this.primaryClick.emit(event);
  }

  onItemClick(item: ButtonMenuItem<T>): void {
    if (item.disabled) return;

    this.itemClick.emit(item);

    if (this.options.closeOnItemClick) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.options.closeOnOutsideClick || !this.isOpen()) return;

    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  }
}

export class ButtonDropdownOptions<T = any> {
  triggerButton = new ButtonOptions();
  splitButton = false;
  splitActionLabel?: string;
  menuItems: ButtonMenuItem<T>[] = [];
  closeOnOutsideClick = true;
  closeOnItemClick = true;
  cssClass?: string;

  constructor(init?: Partial<ButtonDropdownOptions<T>>) {
    Object.assign(this, init ?? {});
  }
}
export class ButtonMenuItem<T = any> {
  id!: string;
  label!: string;
  icon?: string;
  cssClass?: string;
  disabled = false;
  danger = false;
  dividerBefore = false;
  data?: T;

  constructor(init: Partial<ButtonMenuItem<T>>) {
    Object.assign(this, init);
  }
}
