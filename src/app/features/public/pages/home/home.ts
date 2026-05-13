import { Component } from '@angular/core';
import { FeatureProducts } from './components/feature-products/feature-products';
import { FeatureRecipes } from './components/feature-recipes/feature-recipes';
import { RecentPosts } from './components/recent-posts/recent-posts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FeatureProducts, FeatureRecipes, RecentPosts, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
