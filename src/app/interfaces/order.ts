export interface Order {
  id: string;
  cant: number;
  createdAt: string;
  description: string;
  location: Location;
  products: Product[];
  street1: string;
  street2: string;
  street3: string;
  total: number;
  user: User;
  userId: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Product {
  cant: number;
  id: string;
  images: Image[];
  name: string;
  price: number;
  subtotal: number;
}

export interface Image {
  id: string;
  url: string;
}

export interface User {
  email: string;
  name: string;
  phone: string;
  role: string;
  uid: string;
}
