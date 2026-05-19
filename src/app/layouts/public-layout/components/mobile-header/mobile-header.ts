import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { CloseIcon, DashboardIcon, LogoutIcon } from '@shared/components/icons';
import { AuthService } from '@shared/services/auth.service';
import { ModalAction, ModalOptions } from '@shared/components/modal/modal';
import { ButtonOptions } from '@shared/components';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-mobile-header',
  imports: [RouterLink, RouterLinkActive, CloseIcon, LogoutIcon, DashboardIcon],
  templateUrl: './mobile-header.html',
  styleUrl: './mobile-header.css',
})
export class MobileHeader {
  protected readonly UrlBuilder = UrlBuilder;
  protected readonly authService = inject(AuthService);
  protected readonly modalService = inject(ModalService);
  protected readonly router=inject(Router)

  isOpen = input(false);
  closeMenu = output<void>();

  onClose() {
    this.closeMenu.emit();
  }
  onLogout(): void {
    const options = new ModalOptions({
      title: 'Attention',
      message: 'Do you want to logout?',
      size: 'sm',
      actions: [
        new ModalAction({
          id: 'close',
          button: new ButtonOptions({
            label: 'Close',
            variant: 'ghost',
            size: 'sm',
          }),
          result: { confirmed: false, actionId: 'close' },
        }),
        new ModalAction({
          id: 'save',
          button: new ButtonOptions({
            label: 'Logout',
            variant: 'danger',
            size: 'sm',
          }),
          result: { confirmed: true, actionId: 'close' },
        }),
      ],
    });

    const modalRef = this.modalService.open(options);

    modalRef.afterClosed$.subscribe((result) => {
      if (result?.confirmed) {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}
