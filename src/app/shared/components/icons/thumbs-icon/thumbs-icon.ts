import { Component, input } from '@angular/core';

export enum ThumbDirection{
  Up ,
  Down
}

@Component({
  selector: 'app-thumbs-icon',
  imports: [],
  templateUrl: './thumbs-icon.html',
  styleUrl: './thumbs-icon.css',
})
export class ThumbsIcon {
  thumbDirection = input.required<ThumbDirection>();
  protected readonly ThumbDirection = ThumbDirection;
}
