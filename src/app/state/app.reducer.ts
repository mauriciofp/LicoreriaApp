import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { cartReducer, CartState } from './reducers/cart.reducer';
import { uiReducer, UiState } from './reducers/ui.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
  cart: CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
  cart: cartReducer,
};
