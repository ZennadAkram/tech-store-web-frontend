import publicAxios from "../services/Publicaxios";
import type { Product } from "../types/Product";
import type {  ProductApiResponse } from "../types/ProductsList";

// Return full response object that contains `results: ProductList[]`
export const fetchListProducts = async (page: number): Promise<ProductApiResponse> => {
  const response = await publicAxios.get<ProductApiResponse>(`/products/?page=${page}`);
  return response.data;
};

export const fetchfilterbrand = async (brand: string): Promise<ProductApiResponse> => {
  const response = await publicAxios.get<ProductApiResponse>(`/products/?brand=${brand}`);
  return response.data;
};

export const fetchfiltercategory = async (category: string): Promise<ProductApiResponse> => {
  const response = await publicAxios.get<ProductApiResponse>(`/products/?category=${category}`);
  return response.data;
};

export const sortproducts = async (sorter: string): Promise<ProductApiResponse> => {
  const response = await publicAxios.get<ProductApiResponse>(`/products/?ordering=${sorter}`);
  return response.data;
};
export const filterproducts=async(filter:string):Promise<ProductApiResponse>=>{
  const response = await publicAxios.get(`/products/?${filter}`);
  return response.data;
}

export const fetchdetailproduct=async(id:number):Promise<Product>=>{
  const response=await publicAxios.get<Product>(`/products/${id}`);
  return response.data;
}