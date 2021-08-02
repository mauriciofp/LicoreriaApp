import { createReducer, on } from '@ngrx/store';
import { ProductCart } from 'src/app/models/product-cart';
import {
  addProduct,
  cleanCart,
  decrementProduct,
  incrementProduct,
  removeProduct,
} from '../actions/cart.action';

export interface CartState {
  products: ProductCart[];
  total: number;
  cant: number;
}

export const initialCartState: CartState = {
  // products: [
  //   {
  //     id: '-MdltyvaX3JK6gu62yjl',
  //     cant: 2,
  //     images: [
  //       {
  //         id: '-Mdltzff6WDW9mwGM9JE',
  //         url: 'https://firebasestorage.googleapis.com/v0/b/storeapp-9941c.appspot.com/o/products%2F1625408665885_1625408665885-no-name?alt=media&token=29b4c868-8c26-45f0-9b40-f5f66944d84e',
  //       },
  //     ],
  //     name: 'Coca cola',
  //     price: 10,
  //     subtotal: 20,
  //   },
  // ],
  products: [],
  total: null,
  cant: null,
};

const _cartReducer = createReducer(
  initialCartState,

  on(addProduct, (state, { product }) => ({
    products: state.products.find((p) => p.id === product.id)
      ? state.products.map((p) =>
          p.id === product.id
            ? { ...p, subtotal: p.subtotal + p.price, cant: p.cant + 1 }
            : p
        )
      : [...state.products, product],
    total: state.total + product.price,
    cant: state.cant + 1,
  })),

  on(removeProduct, (state, { product }) => ({
    products: state.products.filter((p) => p.id !== product.id),
    total: state.total - product.subtotal,
    cant: state.cant - product.cant,
  })),

  on(incrementProduct, (state, { product }) => ({
    products: state.products.map((p) =>
      p.id === product.id
        ? { ...p, cant: p.cant + 1, subtotal: p.subtotal + p.price }
        : p
    ),
    total: state.total + product.price,
    cant: state.cant + 1,
  })),

  on(decrementProduct, (state, { product }) => ({
    products: state.products.map((p) =>
      p.id === product.id
        ? { ...p, cant: p.cant - 1, subtotal: p.subtotal - p.price }
        : p
    ),
    total: state.total - product.price,
    cant: state.cant - 1,
  })),

  on(cleanCart, (state) => ({
    products: [],
    total: 0,
    cant: 0,
  }))
);

export function cartReducer(state, action) {
  return _cartReducer(state, action);
}
