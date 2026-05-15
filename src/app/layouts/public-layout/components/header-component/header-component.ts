import { Component } from '@angular/core';
import { ThemeColor } from '@shared/components/theme-color/theme-color';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';

@Component({
  selector: 'app-public-header-component',
  imports: [ThemeColor, RouterLink, RouterLinkActive],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  protected readonly UrlBuilder = UrlBuilder;
}
