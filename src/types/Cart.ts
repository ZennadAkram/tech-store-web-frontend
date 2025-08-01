import type { Version } from "./Product";

export interface Cart{
id:number;
user:number;
items:Items[];
}
export interface Count{
    total_items:number;
}
export interface itemupdate{
  cart:number;
  version:number;
  input_color_id:number | null;
  quantity:number;
}
export interface itemwithproductid{
  cart:number;
  product_id:number;
  quantity:number;
}
export interface Items{
id:number;
cart:number;
quantity:number;
date_added:string;
version:number;
version_details:Version;
color_id:number;
product_name:string;
product_starting_price:string | null;
product_poster_image:string | null;
stock:number|null;
product_id:number|null;
}
export interface CartApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Cart[]; 
}
