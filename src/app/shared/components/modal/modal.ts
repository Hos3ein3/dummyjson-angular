import { Component, computed, HostListener, input, output, TemplateRef,inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from '@shared/services/modal.service';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { Button, ButtonOptions } from '@shared/components/button/button';
import { CloseIcon } from '@shared/components/icons';




@Component({
  selector: 'app-modal',
  imports: [NgTemplateOutlet, NgClass, NgIf, NgForOf, Button, CloseIcon],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  private readonly modalService = inject(ModalService);
  readonly modal = this.modalService.activeModal;
  readonly closeButtonOptions = new ButtonOptions({
    label: '',
    variant: 'ghost',
    size: 'sm',
    rounded: false,
    iconOnly: true,
    ariaLabel: 'Close modal',
    cssClass: 'modal-close-btn',
  });
  buildActionButtonOptions(action: ModalAction): ButtonOptions {
    return new ButtonOptions({
      ...action.button,
      disabled: action.disabled || action.button.disabled,
    });
  }
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.modalService.closeByEscape();
  }

  close(): void {
    this.modalService.close({ confirmed: false, actionId: 'close' });
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.modalService.closeByBackdrop();
    }
  }

  runAction(action: any): void {
    this.modalService.runAction(action);
  }

  sizeClass(size: 'sm' | 'md' | 'lg'): string {
    switch (size) {
      case 'sm':
        return 'modal-sm';
      case 'lg':
        return 'modal-lg';
      default:
        return 'modal-md';
    }
  }
}
export class ModalAction<T = any> {
  id!: string;
  label!: string;
  button = new ButtonOptions();
  cssClass = 'btn-secondary';
  closeOnClick = true;
  result?: ModalResult<T>;
  disabled = false;

  constructor(init: Partial<ModalAction<T>>) {
    Object.assign(this, init);
    this.button = new ButtonOptions(init.button);
  }
}
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalResult<T = any> {
  confirmed: boolean;
  actionId?: string;
  data?: T;
}

export class ModalOptions<T = any> {
  id?: string;
  title?: string;
  message?: string;
  size: ModalSize = 'md';

  showHeader = true;
  showFooter = true;
  showCloseButton = true;
  closeOnBackdrop = true;
  closeOnEscape = true;

  actions: ModalAction<T>[] = [];
  data?: T;

  contentTemplate?: TemplateRef<unknown>;

  constructor(init?: Partial<ModalOptions<T>>) {
    Object.assign(this, init ?? {});
  }
}
export interface ModalState {
  isOpen: boolean;
  options: ModalOptions;
}

export class ModalRef<T = any> {
  private readonly _afterClosed = new Subject<ModalResult<T> | null>();

  afterClosed$ = this._afterClosed.asObservable();

  close(result: ModalResult<T> | null = null): void {
    this._afterClosed.next(result);
    this._afterClosed.complete();
  }
}
