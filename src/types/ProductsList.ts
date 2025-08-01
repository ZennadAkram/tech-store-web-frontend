import type { Color } from "./Product";

export interface Brand {
  name: string;
  image?:string
}

export interface Category {
  name: string;
}

export interface ProductList {
  id: number;
  name: string;
  description: string;
  starting_price: string;
  brand: Brand;
  category: Category;
  average_rating: number | null;
  poster_image: string | null;
  review_count:number;
  versions:Id[] 
}

export interface Id{
  id:number
  colors:Color[];
}

export interface ProductApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductList[];
}
