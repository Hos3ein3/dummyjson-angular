import { Component, Input } from '@angular/core';
import { InfoBadge, InfoBadgeOptions } from '@shared/components/info-badge/info-badge';

@Component({
  selector: 'app-label',
  imports: [InfoBadge],
  templateUrl: './label.html',
  styleUrl: './label.css',
})
export class Label {
  @Input({ required: true }) options!: LabelOptions;
}
export class LabelOptions {
  text = '';
  forId?: string;
  required = false;
  hide = false;
  cssClass?: string;

  infoBadge?: InfoBadgeOptions;

  constructor(init?: Partial<LabelOptions>) {
    Object.assign(this, init ?? {});
  }
}
