import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  @Input({ required: true }) rating!: number;

  get fullStars(): number[] {
    return Array(Math.floor(this.rating)).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 >= 0.5;
  }

  get emptyStars(): number[] {
    const full = Math.floor(this.rating);
    const half = this.hasHalfStar ? 1 : 0;
    return Array(5 - full - half).fill(0);
  }
}
