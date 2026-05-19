import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftMenuDynamic } from './components/left-menu-dynamic/left-menu-dynamic';
import { dashboardNavGroups } from './components/left-menu-dynamic/dashboardNavGroups';
import { LeftMenu } from './components/left-menu/left-menu';
import { Header } from './components/header/header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, LeftMenuDynamic, LeftMenu, Header],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  navGroups = dashboardNavGroups;
  collapsed = signal(false);
}
