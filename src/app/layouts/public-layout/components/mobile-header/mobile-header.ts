import { Component, input, output } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { UrlBuilder } from '@shared/utils/url-builder';
import { CloseIcon } from '@shared/components/icons';

@Component({
  selector: 'app-mobile-header',
  imports: [RouterLink, RouterLinkActive, CloseIcon],
  templateUrl: './mobile-header.html',
  styleUrl: './mobile-header.css',
})
export class MobileHeader {
  protected readonly UrlBuilder = UrlBuilder;
  isOpen = input(false);
  closeMenu = output<void>();

  onClose() {
    this.closeMenu.emit();
  }
  onLogout() {}
}
