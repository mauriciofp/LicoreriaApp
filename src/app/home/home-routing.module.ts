import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchProductsComponent } from './components/search-products/search-products.component';

import { HomePage } from './home.page';
import { CategoryComponent } from './pages/category/category.component';
import { HomePromotionComponent } from './pages/home-promotion/home-promotion.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'category/:category',
    component: CategoryComponent,
  },
  {
    path: 'promotion/:id',
    component: HomePromotionComponent,
  },
  {
    path: 'search',
    component: SearchProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
