import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FeatureProducts } from './components/feature-products/feature-products';
import { FeatureRecipes } from './components/feature-recipes/feature-recipes';
import { RecentPosts } from './components/recent-posts/recent-posts';
import { RouterLink } from '@angular/router';
import { Stats } from './components/stats/stats';
import { DailyQuote } from './components/daily-quote/daily-quote';
import { Hero } from './components/hero/hero';
import { PagedResult } from '@shared/models/base.model';
import { ProductModel } from '@core/models/product.model';
import { RecipeModel } from '@core/models/recipe.model';
import { PostModel } from '@core/models/post.model';
import { QuoteModel } from '@core/models/quote.model';
import { ProductService } from '@shared/services/product.service';
import { QuoteService } from '@shared/services/quote.service';
import { RecipeService } from '@shared/services/recipe.service';
import { PostService } from '@shared/services/post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import { UrlBuilder } from '@shared/utils/url-builder';

@Component({
  selector: 'app-home',
  imports: [FeatureProducts, FeatureRecipes, RecentPosts, RouterLink, Stats, DailyQuote, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products = signal<PagedResult<ProductModel> | undefined>(undefined);
  recipes = signal<PagedResult<RecipeModel> | undefined>(undefined);
  posts = signal<PagedResult<PostModel> | undefined>(undefined);
  quotes = signal<PagedResult<QuoteModel> | undefined>(undefined);

  private destroyRef = inject(DestroyRef);
  private productService: ProductService = inject(ProductService);
  private quoteService: QuoteService = inject(QuoteService);
  private recipeService: RecipeService = inject(RecipeService);
  private postService: PostService = inject(PostService);

  ngOnInit() {
    this.productService
      .getAll({ limit: 8, skip: 0 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (result) => setTimeout(() => this.products.set(result),environment.loaderDelayMs) });

    this.recipeService
      .getAll({ limit: 8, skip: 0 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (result) => setTimeout(() => this.recipes.set(result),environment.loaderDelayMs) });

    this.postService
      .getAll({ limit: 8, skip: 0 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (result) => setTimeout(() => this.posts.set(result),environment.loaderDelayMs) });

    this.quoteService
      .getAll({ limit: 1, skip: 0 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (result) => setTimeout(() => this.quotes.set(result),environment.loaderDelayMs) });
  }
  //OR
  // forkJoin({
  //   products: this.productService.getAll({ limit: 8, skip: 0 }),
  //   recipes: this.recipeService.getAll({ limit: 8, skip: 0 }),
  //   posts: this.postService.getAll({ limit: 8, skip: 0 }),
  //   quotes: this.quoteService.getAll({ limit: 1, skip: 0 }),
  // })
  // .pipe(takeUntilDestroyed(this.destroyRef))
  // .subscribe({
  //   next: ({ products, recipes, posts, quotes }) => {
  //     this.products.set(products);
  //     this.recipes.set(recipes);
  //     this.posts.set(posts);
  //     this.quotes.set(quotes);
  //   },
  //   error: () => { /* one error handler for all */ }
  // });

  //BUT
  //Note: with forkJoin, if any one request fails, the entire thing errors and no data is set.
  protected readonly UrlBuilder = UrlBuilder;
}
