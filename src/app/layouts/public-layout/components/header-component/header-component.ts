import { Component, signal } from '@angular/core';
import { ThemeColor } from '@shared/components/theme-color/theme-color';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { MobileHeader } from '../mobile-header/mobile-header';
import { Document } from 'postcss';

@Component({
  selector: 'app-public-header-component',
  imports: [ThemeColor, RouterLink, RouterLinkActive, MobileHeader],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  protected readonly UrlBuilder = UrlBuilder;
  mobileMenuOpen = signal(false);

  onToggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
    console.log(this.mobileMenuOpen());
  }

  onCloseMobileMenu() {
    this.mobileMenuOpen.set(false);
    console.log(this.mobileMenuOpen());
  }
}
