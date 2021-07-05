import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductCart } from 'src/app/models/product-cart';
import {
  decrementProduct,
  incrementProduct,
  removeProduct,
} from 'src/app/state/actions/cart.action';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {
  @Input() product: ProductCart;

  constructor(private store: Store) {}

  ngOnInit() {}

  incrementCant(product: ProductCart) {
    this.store.dispatch(incrementProduct({ product }));
  }

  decrementCant(product: ProductCart) {
    if (product.subtotal > product.price) {
      this.store.dispatch(decrementProduct({ product }));
    } else {
      this.store.dispatch(removeProduct({ product }));
    }
  }

  removeProductFromCart(product: ProductCart) {
    this.store.dispatch(removeProduct({ product }));
  }
}
