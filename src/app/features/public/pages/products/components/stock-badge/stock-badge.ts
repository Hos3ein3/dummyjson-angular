import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-stock-badge',
  imports: [NgStyle],
  templateUrl: './stock-badge.html',
  styleUrl: './stock-badge.css',
})
export class StockBadge {
  @Input({ required: true }) item!: ProductModel;
}
