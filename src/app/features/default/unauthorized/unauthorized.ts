import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LockIcon } from '@shared/components/icons';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink, LockIcon],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.css',
})
export class Unauthorized {}
