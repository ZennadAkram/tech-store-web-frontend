import axios from "../services/axios";
import type {  CartApiResponse, Count, itemupdate, itemwithproductid } from "../types/Cart";

export const cartitemcounter=async():Promise<Count>=>{
    const res=await axios.get("/cart/items/count/");
    return res.data;
};

export const carteditems=async(): Promise<CartApiResponse>=>{
    const res =await axios.get("/cartlist/");
    return res.data;
};

export const carteditemsclear = async () => {
    const res = await axios.delete("/cart/clear/");
    return res.data;
};

export const deletecartitem=async(id:number)=>{
const res =await axios.delete(`/carteditems/updatedeleteretrieve/${id}/`)
return res;
};

export const updatecartitem=async(id:number,data:itemupdate)=>{
   const res = await axios.put(`/carteditems/updatedeleteretrieve/${id}/`,data);
   return res.data;
};
export const addtocart=async(data:itemupdate)=>{
   const res = await axios.post(`/carteditems/create/`,data);
   return res.data;
};

export const addtocartproductid=async(data:itemwithproductid)=>{
   const res = await axios.post(`/carteditems/create/`,data);
   return res.data;
};

export const updatecartproductid=async(id:number,data:itemwithproductid)=>{
   const res = await axios.put(`/carteditems/updatedeleteretrieve/${id}/`,data);
   return res.data;
};