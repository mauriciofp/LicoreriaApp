import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app.reducer';

import { ProductService } from '../services/product.service';

import { categories, Product } from '../interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  products: Product[] = [];

  productsSlideOpts = {
    slidesPerView: 2.1,
    spaceBetween: 8,
  };

  categoriesSlideOpts = {
    slidesPerView: 2.5,
    spaceBetween: 8,
  };

  promotionsSlideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 4,
  };

  categories = categories;

  promotions = ['PROMOCION 1', 'PROMOCION 2', 'PROMOCION 3'];

  cantInCart: number;
  cartSubs: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productService
      .getProductForHome()
      .subscribe((res) => (this.products = res));
    this.cartSubs = this.store
      .select('cart')
      .subscribe(({ cant }) => (this.cantInCart = cant));
  }

  ngOnDestroy() {
    this.cartSubs?.unsubscribe();
  }
}
