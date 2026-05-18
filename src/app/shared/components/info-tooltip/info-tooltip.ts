import { Component, Input } from '@angular/core';
import { ButtonOptions } from '@shared/components/button/button';

@Component({
  selector: 'app-info-tooltip',
  imports: [],
  templateUrl: './info-tooltip.html',
  styleUrl: './info-tooltip.css',
})
export class InfoTooltip {
  @Input({ required: true }) infoTooltipOptions?: InfoTooltipOptions;
}

export class InfoTooltipOptions {
  tip: string = '';
  constructor(init?: Partial<InfoTooltipOptions>) {
    Object.assign(this, init ?? {});
  }
}
