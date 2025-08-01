import publicAxios from "../services/Publicaxios";
import type { BrandApiResponse } from "../types/BrandApiResponse";

export const brandlist= async (page:number):Promise<BrandApiResponse> =>{
    const response=await publicAxios.get<BrandApiResponse>(`/ListBrand/?page=${page}`)
    return response.data
}
