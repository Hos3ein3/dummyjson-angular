import { Component, signal, inject, effect } from '@angular/core';
import { ThemeColor } from '@shared/components/theme-color/theme-color';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { MobileHeader } from '../mobile-header/mobile-header';
import { DashboardIcon, LogoutIcon } from '@shared/components/icons';
import { ModalService } from '@shared/services/modal.service';
import { ModalAction, ModalOptions } from '@shared/components/modal/modal';
import { ButtonOptions } from '@shared/components/button/button';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-public-header-component',
  imports: [ThemeColor, RouterLink, RouterLinkActive, MobileHeader, DashboardIcon, LogoutIcon],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  protected readonly UrlBuilder = UrlBuilder;
  mobileMenuOpen = signal(false);
  private readonly modalService = inject(ModalService);
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  constructor() {
    // effect(() => {
    //   console.log('auth?', this.authService.isAuthenticated());
    //   console.log('user', this.authService.currentUser());
    //   console.log('refreshToken:', this.authService.refreshToken());
    // });
  }

  onToggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
    console.log(this.mobileMenuOpen());
  }

  onCloseMobileMenu() {
    this.mobileMenuOpen.set(false);
    console.log(this.mobileMenuOpen());
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
