import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  private router = inject(Router);

  // Read the returnUrl passed via router state
  protected returnUrl: string =
    this.router.lastSuccessfulNavigation()?.extras?.state?.['returnUrl'] ?? '/';

  goBack() {
    this.router.navigate([this.returnUrl]);
  }
}
