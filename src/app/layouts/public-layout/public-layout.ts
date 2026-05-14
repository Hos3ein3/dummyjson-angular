import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header-component/header-component';
import { FooterComponent } from './components/footer-component/footer-component';
import { ThemeColor } from '../../shared/components/theme-color/theme-color';
import { filter } from 'rxjs';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {
    const sub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.initScrollAnimations(), 100);
      });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
  onRouteActivate() {
    setTimeout(() => this.initScrollAnimations(), 100);
  }
  private initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document
      .querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
      .forEach((el) => observer.observe(el));
  }
}

