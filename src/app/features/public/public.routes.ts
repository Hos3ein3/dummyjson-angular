import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { Posts } from './pages/posts/posts';
import { PostDetail } from './pages/post-detail/post-detail';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { productResolver } from '@core/resolvers/product.resolver';

export const publicRoutes: Routes=[
  {
  path:'',component:Home
  }
  ,
  {
    path:'products',component:Products
  },
  {
    path:'products/:id',loadComponent:()=>
      import('./pages/product-detail/product-detail')
      .then(x=>x.ProductDetail),
    resolve:{
      product:productResolver
    }
  },
  {
    path:'recipes',component:Recipes
  },
  {
    path:'recipes/:id' , component: RecipeDetail
  },
  {
    path:'posts',component:Posts
  },
  {
    path:'posts/:id',component:PostDetail
  },
  {path:'cart',component:Cart},
  {path:'profile',component:Profile}
]
