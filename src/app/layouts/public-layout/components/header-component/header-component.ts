import { Component, signal ,inject} from '@angular/core';
import { ThemeColor } from '@shared/components/theme-color/theme-color';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { MobileHeader } from '../mobile-header/mobile-header';
import { Document } from 'postcss';
import { DashboardIcon ,ClockIcon} from '@shared/components/icons';
import { ModalService } from '@shared/services/modal.service';
import { ModalAction, ModalOptions } from '@shared/components/modal/modal';
import { ButtonOptions } from '@shared/components/button/button';

@Component({
  selector: 'app-public-header-component',
  imports: [ThemeColor, RouterLink, RouterLinkActive, MobileHeader, DashboardIcon, ClockIcon],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  protected readonly UrlBuilder = UrlBuilder;
  mobileMenuOpen = signal(false);
  private readonly modalService = inject(ModalService);

  onToggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
    console.log(this.mobileMenuOpen());
  }

  onCloseMobileMenu() {
    this.mobileMenuOpen.set(false);
    console.log(this.mobileMenuOpen());
  }

  openModalTest(): void {
    const options = new ModalOptions({
      title: 'small Modal',
      message:
        'Large modals are perfect for detailed content, data tables, or multi-section forms.',
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
            label: 'Save',
            variant: 'primary',
            size: 'sm',
          }),
          result: { confirmed: true, actionId: 'close' },
        }),
      ],
    });

    const modalRef = this.modalService.open(options);

    modalRef.afterClosed$.subscribe((result) => {
      if (result?.confirmed) {
        console.log('Confirmed');
      }
    });
  }
}
