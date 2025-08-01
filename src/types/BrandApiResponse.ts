import type { Brand } from "./ProductsList";


export interface BrandApiResponse{
count: number;
  next: string | null;
  previous: string | null;
  results:Brand[]
}