import { Component, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FullpageLoader } from '@shared/components/fullpage-loader/fullpage-loader';
import { Toast } from '@shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FullpageLoader, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dummyjson-angular');

  private router = inject(Router);

  isRouteLoading = signal(false);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRouteLoading.set(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isRouteLoading.set(false);
      }
    });
  }
}
