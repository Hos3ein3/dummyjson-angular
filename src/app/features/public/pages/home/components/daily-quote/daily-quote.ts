import { Component } from '@angular/core';
import { QuoteIcon } from '@shared/components/icons';

@Component({
  selector: 'app-daily-quote',
  imports: [QuoteIcon],
  templateUrl: './daily-quote.html',
  styleUrl: './daily-quote.css',
})
export class DailyQuote {}
