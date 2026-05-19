import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { BreadcrumbItem } from '@shared/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  protected readonly UrlBuilder = UrlBuilder;
  items = input.required<BreadcrumbItem[]>();
}
