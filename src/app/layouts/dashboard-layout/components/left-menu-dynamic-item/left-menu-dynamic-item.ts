import { Component, Input, signal, SimpleChanges, Type } from '@angular/core';
import { DashboardNavItem } from '../left-menu-dynamic/left-menu-dynamic';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-left-menu-dynamic-item',
  imports: [RouterLink, RouterLinkActive, NgComponentOutlet],
  templateUrl: './left-menu-dynamic-item.html',
  styleUrl: './left-menu-dynamic-item.css',
})
export class LeftMenuDynamicItem {
  @Input({ required: true }) item!: DashboardNavItem;
  @Input() level = 0;
  @Input() collapsed = false;


  readonly expanded = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collapsed']?.currentValue === true) {
      this.expanded.set(false);
    }
  }
  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.hasActiveChild(this.item)) {
        this.expanded.set(true);
      }
    });
  }

  get hasChildren(): boolean {
    return !!this.item.children?.length;
  }

  toggle(): void {
    if (this.hasChildren) {
      this.expanded.set(!this.expanded());
    }
  }

  hasActiveChild(item: DashboardNavItem): boolean {
    const url = this.router.url;

    if (item.href && url.startsWith(item.href)) {
      return true;
    }

    return item.children?.some((child) => this.hasActiveChild(child)) ?? false;
  }

  getPadding(): string {
    return this.level > 0 ? `${1.5 + this.level}rem` : '0.75rem';
  }
  isIconComponent(icon: DashboardNavItem['icon']): icon is Type<unknown> {
    return typeof icon !== 'string';
  }
}
