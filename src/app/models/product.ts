import { Categories } from "./categories";

export interface Product {
  id: string;
  title: string;
  category: Categories;
  description: string;
  image: string;
  price: number;
}
