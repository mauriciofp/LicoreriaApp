import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../state/app.reducer';
import {
  decrementProduct,
  incrementProduct,
  removeProduct,
} from '../state/actions/cart.action';

import { ProductCart } from '../models/product-cart';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  products: ProductCart[] = [];
  total: number;

  cartSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private utilService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartSubs = this.store
      .select('cart')
      .subscribe(({ products, total }) => {
        this.products = products;
        this.total = total;
      });
  }

  ngOnDestroy() {
    this.cartSubs?.unsubscribe();
  }

  incrementCant(product: ProductCart) {
    this.store.dispatch(incrementProduct({ product }));
  }

  decrementCant(product: ProductCart) {
    if (product.subtotal > product.price) {
      this.store.dispatch(decrementProduct({ product }));
    }
  }

  removeProductFromCart(product: ProductCart) {
    this.store.dispatch(removeProduct({ product }));
  }

  async toOrderDetail() {
    if (this.products.length < 1) {
      const toast = await this.utilService.createToast(
        'No hay nada en su carrito!'
      );
      toast.present();
    }

    this.router.navigate(['/orders/new']);
  }
}
