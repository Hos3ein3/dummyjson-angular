import { Component, DOCUMENT, inject, OnInit, signal } from '@angular/core';
import { AppConstants } from '../../constants/constant';
import { MoonIcon, SunIcon } from '@shared/components/icons';


@Component({
  selector: 'app-theme-color',
  imports: [MoonIcon, SunIcon],
  templateUrl: './theme-color.html',
  styleUrl: './theme-color.css',
})
export class ThemeColor implements OnInit {
  private doc = inject(DOCUMENT);

  isDarkTheme = signal<boolean>(false);

  ngOnInit() {
    const savedTheme = localStorage.getItem(AppConstants.Theme_Storage_key);
    const isDark = savedTheme === 'dark';
    this.applyTheme(isDark);
  }
  onToggle() {
    this.applyTheme(!this.isDarkTheme());
  }

  private applyTheme(dark: boolean) {
    this.isDarkTheme.set(dark);
    this.doc.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(AppConstants.Theme_Storage_key, dark ? 'dark' : 'light');
  }
}
