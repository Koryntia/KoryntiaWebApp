export type User = {
  id: string;
  name: string;
  username: string;
  password?: string;
  image: string;
};

export interface Product {
  product_id: string;
  category_id: string;
  description: string;
  name: string;
  price: number;
  quantity: number;
}