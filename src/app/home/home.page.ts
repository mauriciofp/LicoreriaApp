import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app.reducer';

import { ProductService } from '../services/product.service';

import { categories, Product } from '../interfaces/interface';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../models/promotion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  productsSlideOpts = {
    slidesPerView: 2.1,
  };

  categoriesSlideOpts = {
    slidesPerView: 2.3,
    spaceBetween: 8,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.3,
      },
      768: {
        slidesPerView: 3.3,
        spaceBetween: 16,
      },
    },
  };

  promotionsSlideOpts = {
    slidesPerView: 1.1,
    spaceBetween: 4,
    breakpoints: {
      640: {
        slidesPerView: 1.3,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 8,
      },
      1366: {
        slidesPerView: 1.7,
        spaceBetween: 8,
      },
    },
  };

  categories = categories;

  products: Product[] = [];
  productsSubs: Subscription;

  promotions: Promotion[] = [];
  promotionsSubs: Subscription;

  cantInCart: number;
  cartSubs: Subscription;

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productsSubs = this.productService
      .getProductForHome()
      .subscribe((res) => (this.products = res));

    this.promotionsSubs = this.promotionService
      .getAvailable()
      .subscribe((res) => (this.promotions = res));

    this.cartSubs = this.store
      .select('cart')
      .subscribe(({ cant }) => (this.cantInCart = cant));
  }

  ngOnDestroy() {
    this.cartSubs?.unsubscribe();
    this.productsSubs?.unsubscribe();
    this.promotionsSubs?.unsubscribe();
  }
}
