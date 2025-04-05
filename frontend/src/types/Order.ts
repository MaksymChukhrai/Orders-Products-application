import { Product } from './Product';

export interface Price {
  value: number;
  currency: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  title: string;
  date: string;
  description?: string;
  products: Product[];
  productsCount: number;
  totalPrice: Price[];
}