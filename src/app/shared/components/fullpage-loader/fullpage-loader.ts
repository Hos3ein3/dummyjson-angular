import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fullpage-loader',
  imports: [],
  templateUrl: './fullpage-loader.html',
  styleUrl: './fullpage-loader.css',
})
export class FullpageLoader {
  text = input('Loading...');
  visible = input(false);
}
