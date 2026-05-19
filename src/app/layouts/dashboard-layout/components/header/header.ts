import { Component, computed, HostListener, inject, output, signal } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { ThemeColor } from '@shared/components/theme-color/theme-color';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BellIcon, GearIcon, SearchIcon } from '@shared/components/icons';
import { Breadcrumb } from '../../../../features/dashboard/components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';

@Component({
  selector: 'app-header',
  imports: [ThemeColor, RouterLink, FormsModule, GearIcon, BellIcon, SearchIcon, Breadcrumb],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService = inject(AuthService);
  breadcrumbService = inject(BreadcrumbService);
  //private readonly themeService = inject(ThemeService);

  mobileMenuToggle = output<void>();
  settingsClick = output<void>();

  search = signal('');
  megaMenuOpen = signal(false);
  langOpen = signal(false);
  notifOpen = signal(false);
  userOpen = signal(false);
  selectedLanguage = signal<'EN' | 'IT' | 'FA'>('EN');
  selectedFlag = signal('🇬🇧');

  protected readonly currentUser = this.authService.currentUser;
  protected readonly userName = computed(() => this.currentUser()?.firstName || 'Admin');
  protected readonly userEmail = computed(() => this.currentUser()?.email || 'admin@example.com');
  protected readonly userInitial = computed(() => this.userName().charAt(0).toUpperCase());
  //protected readonly isDark = this.themeService.isDark;

  toggleMobileMenu(): void {
    this.mobileMenuToggle.emit();
  }

  toggleMegaMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.closeAllDropdowns();
    this.megaMenuOpen.set(!this.megaMenuOpen());
  }

  toggleLang(event: MouseEvent): void {
    event.stopPropagation();
    this.closeAllDropdowns();
    this.langOpen.set(!this.langOpen());
  }

  toggleNotif(event: MouseEvent): void {
    event.stopPropagation();
    this.closeAllDropdowns();
    this.notifOpen.set(!this.notifOpen());
  }

  toggleUser(event: MouseEvent): void {
    event.stopPropagation();
    this.closeAllDropdowns();
    this.userOpen.set(!this.userOpen());
  }

  selectLang(flag: string, lang: 'EN' | 'IT' | 'FA'): void {
    this.selectedFlag.set(flag);
    this.selectedLanguage.set(lang);
    this.langOpen.set(false);
  }

  // toggleTheme(): void {
  //   this.themeService.toggle();
  // }

  openSettings(): void {
    this.settingsClick.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  private closeAllDropdowns(): void {
    this.megaMenuOpen.set(false);
    this.langOpen.set(false);
    this.notifOpen.set(false);
    this.userOpen.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeAllDropdowns();
  }
}
