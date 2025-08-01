import publicAxios from "../services/Publicaxios";
import type { PricecountApiResponse } from "../types/Pricecount";

export const pricecounter = async (ranges: string[]): Promise<PricecountApiResponse> => {
    const response = await publicAxios.get<PricecountApiResponse>(
        '/products-price-count/',
        { params: { ranges: ranges.join(',') } } 
    );
    return response.data;
};
