import { Image } from '../interfaces/interface';

export class ProductCart {
  static fromProduct({ id, name, price, images }) {
    return new ProductCart(id, name, price, 1, price, images);
  }
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public cant: number,
    public subtotal: number,
    public images: Image[]
  ) {}
}
