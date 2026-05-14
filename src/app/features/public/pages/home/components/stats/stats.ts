import { Component, effect, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [DecimalPipe],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  totalProducts = input.required<number>();
  totalRecipes = input.required<number>();
  totalPosts = input.required<number>();
  totalQuotes = input.required<number>();

  animatedProducts = signal(0);
  animatedRecipes = signal(0);
  animatedPosts = signal(0);
  animatedQuotes = signal(0);

  private timers = new Map<string, ReturnType<typeof setInterval>>();

  constructor() {
    effect(() => this.animateCounter('stat-products', this.totalProducts(), this.animatedProducts));
    effect(() => this.animateCounter('recipes', this.totalRecipes(), this.animatedRecipes));
    effect(() => this.animateCounter('posts', this.totalPosts(), this.animatedPosts));
    effect(() => this.animateCounter('quotes', this.totalQuotes(), this.animatedQuotes));
  }

  private animateCounter(key: string, target: number, counter: ReturnType<typeof signal<number>>) {
    if (target === 0) return;

    // Clear any existing timer for this counter
    const existing = this.timers.get(key);
    if (existing) clearInterval(existing);

    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        this.timers.delete(key);
      }
      counter.set(current);
    }, 20);

    this.timers.set(key, timer);
  }
}
