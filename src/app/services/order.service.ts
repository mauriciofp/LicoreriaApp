import { Injectable } from '@angular/core';
import { ProductCart } from '../models/product-cart';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  createOrder(
    { stree1, street, street3, description },
    location: string,
    products: ProductCart[],
    total: number,
    cant: number,
    user: User
  ) {}
}
