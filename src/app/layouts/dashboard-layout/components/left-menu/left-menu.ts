import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardIcon } from '@shared/components/icons';

@Component({
  selector: 'app-left-menu',
  imports: [RouterLink, RouterLinkActive, DashboardIcon],
  templateUrl: './left-menu.html',
  styleUrl: './left-menu.css',
})
export class LeftMenu {
  collapsed = signal(false);

  productsOpen = signal(true);
  contentOpen = signal(false);
  usersOpen = signal(false);

  toggleSidebar(): void {
    this.collapsed.update((v) => !v);
  }

  toggleProducts(): void {
    this.productsOpen.update((v) => !v);
  }

  toggleContent(): void {
    this.contentOpen.update((v) => !v);
  }

  toggleUsers(): void {
    this.usersOpen.update((v) => !v);
  }
  onToggle() {}
}
