import { Component, Input } from '@angular/core';
import { InfoTooltip, InfoTooltipOptions } from '@shared/components/info-tooltip/info-tooltip';

@Component({
  selector: 'app-info-badge',
  imports: [InfoTooltip],
  templateUrl: './info-badge.html',
  styleUrl: './info-badge.css',
})
export class InfoBadge {
  @Input({ required: true }) infoBadgeOptions!: InfoBadgeOptions;
}

export class InfoBadgeOptions {
  icon: '!' | '?' = '!';
  infoToolTipOptions?: InfoTooltipOptions = undefined;
  tip: string = '';
  constructor(init?: Partial<InfoBadgeOptions>) {
    Object.assign(this, init ?? {});
  }
}
