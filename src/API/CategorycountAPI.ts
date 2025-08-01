import publicAxios from "../services/Publicaxios";
import type { Categorycount } from "../types/Categorycount";

export const categorycount = async (): Promise<Categorycount[]> => {
    const response = await publicAxios.get<Categorycount[]>('/category-product-count/');
    return response.data;
};
