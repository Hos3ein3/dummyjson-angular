import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-item',
  imports: [],
  templateUrl: './total-item.html',
  styleUrl: './total-item.css',
})
export class TotalItem {
  @Input({required:true}) totalItem!: number | undefined;

}
