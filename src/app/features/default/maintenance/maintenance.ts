import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GearIcon } from '@shared/components/icons';

@Component({
  selector: 'app-maintenance',
  imports: [RouterLink, GearIcon],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {}
