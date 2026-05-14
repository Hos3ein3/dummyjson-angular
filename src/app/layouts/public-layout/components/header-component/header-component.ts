import { Component } from '@angular/core';
import { ThemeColor } from '@shared/components/theme-color/theme-color';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-public-header-component',
  imports: [ThemeColor, RouterLink, RouterLinkActive],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {}
