import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductCart } from '../models/product-cart';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersRoot = 'orders';

  constructor(private db: AngularFireDatabase) {}

  createOrder(
    { street1, street2, street3, description },
    { lng, lat },
    products: ProductCart[],
    total: number,
    cant: number,
    user: User
  ) {
    const createdAt = new Date().toUTCString();

    return this.db.list(this.ordersRoot).push({
      street1,
      street2,
      street3,
      description,
      location: { lng, lat },
      products,
      total,
      cant,
      user,
      createdAt,
      userId: user.uid,
    });
  }
}
