import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { UrlBuilder } from '@shared/utils/url-builder';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly UrlBuilder = UrlBuilder;
}
