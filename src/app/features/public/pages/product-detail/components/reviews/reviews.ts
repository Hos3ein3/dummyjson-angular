import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { StarRating } from '@shared/components/star-rating/star-rating';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [StarRating, DatePipe],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {
  @Input({ required: true }) product!: ProductModel;
}
