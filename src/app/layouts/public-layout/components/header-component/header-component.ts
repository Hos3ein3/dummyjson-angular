import { Component } from '@angular/core';
import { ThemeColor } from '../../../../shared/components/theme-color/theme-color';

@Component({
  selector: 'app-public-header-component',
  imports: [ThemeColor],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {}
