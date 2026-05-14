import { Component, Input } from '@angular/core';

export enum ArrowDirection {
  Up,Down,Left,Right
}
@Component({
  selector: 'app-arrow-icon',
  imports: [],
  templateUrl: './arrow-icon.html',
  styleUrl: './arrow-icon.css',
})
export class ArrowIcon {

  @Input({required:true}) arrowDirection?: ArrowDirection;
  protected  readonly  ArrowDirection = ArrowDirection;
}
