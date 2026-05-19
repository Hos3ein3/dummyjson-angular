import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { LeftMenuDynamicItem } from '../left-menu-dynamic-item/left-menu-dynamic-item';
import { RouterLink } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';

@Component({
  selector: 'app-left-menu-dynamic',
  imports: [LeftMenuDynamicItem, RouterLink],
  templateUrl: './left-menu-dynamic.html',
  styleUrl: './left-menu-dynamic.css',
})
export class LeftMenuDynamic {
  @Input({ required: true }) navGroups: DashboardNavGroup[] = [];
   collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  collapseSidebar(): void {
    this.collapsed = !this.collapsed;
    console.log('calling collapseSidebar: '+ this.collapsed);
    this.collapsedChange.emit(this.collapsed);
  }
  // collapseSidebar(): void {
  //   this.collapsed = !this.collapsed;
  // }

  protected readonly UrlBuilder = UrlBuilder;
}


export interface DashboardNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: Type<unknown> | string;
  children?: DashboardNavItem[];
}
export interface DashboardNavGroup {
  group: string;
  items: DashboardNavItem[];
}
