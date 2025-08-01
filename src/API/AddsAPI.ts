import type { AddsApiResponse } from "../types/Adds";
import publicAxios from "../services/Publicaxios";

export const addslist = async (page: number): Promise<AddsApiResponse> => {
    const response = await publicAxios.get<AddsApiResponse>(`/ListAdds/?page=${page}`);
    return response.data;
}