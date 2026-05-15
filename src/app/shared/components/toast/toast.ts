import { Component, inject } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';
import { CloseIcon } from '@shared/components/icons';


export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  removing: boolean;
}


@Component({
  selector: 'app-toast',
  imports: [CloseIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  protected toastService = inject(ToastService);
}
