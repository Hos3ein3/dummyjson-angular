import { Component } from '@angular/core';
import {SearchIcon} from "@shared/components/icons";
import { Sorting } from '../sorting/sorting';
import { Category } from '../category/category';

@Component({
  selector: 'app-filtering',
  imports: [SearchIcon, Sorting, Category],
  templateUrl: './filtering.html',
  styleUrl: './filtering.css',
})
export class Filtering {}
