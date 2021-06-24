export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  stock: number;
  unit: string;
  promotion: boolean;
  available: boolean;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductInCart extends Product {
  cant: number;
  subTotal: number;
}

export interface Image {
  id: string;
  url: string;
}
