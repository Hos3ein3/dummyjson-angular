import { Component, effect, inject, OnInit, signal } from '@angular/core';
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
import { Modal } from '@shared/components/modal/modal';
import { AuthService } from '@shared/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FullpageLoader, Toast, Modal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('dummyjson-angular');
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  isRouteLoading = signal(false);

  ngOnInit() {

    this.authService.tryRestoreSession().subscribe({
      error: () => {

      },
    });

  }
  constructor() {

    this.authService.restoreFromStorage();
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
