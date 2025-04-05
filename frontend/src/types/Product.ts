export enum ProductType {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Food = 'Food',
  Books = 'Books',
  Other = 'Other'
}

export interface Guarantee {
  start: string;
  end: string;
}

export interface Product {
  id: string;
  title: string;
  type: ProductType;
  price: number;
  order?: {
    id: string;
    title: string;
  };
  guarantee: Guarantee;
}