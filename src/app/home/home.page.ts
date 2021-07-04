import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app.reducer';

import { ProductService } from '../services/product.service';

import { Product } from '../interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  products: Product[] = [];

  cantInCart: number;
  cartSubs: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((res) => (this.products = res));
    this.cartSubs = this.store
      .select('cart')
      .subscribe(({ cant }) => (this.cantInCart = cant));
  }

  ngOnDestroy() {
    this.cartSubs?.unsubscribe();
  }
}
