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
  products: [],
  total: 0,
  cant: 0,
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
