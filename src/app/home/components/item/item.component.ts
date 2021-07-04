import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/interface';
import { ProductCart } from 'src/app/models/product-cart';
import { addProduct } from 'src/app/state/actions/cart.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  addProductToCart() {
    const product = ProductCart.fromProduct(this.product);
    this.store.dispatch(addProduct({ product }));
  }
}
