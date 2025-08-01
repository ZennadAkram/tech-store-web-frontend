import axios from "../services/axios";
import type { Address, AddressApiResponse } from "../types/Address";

export const address=async():Promise<AddressApiResponse>=>{
    const res=await axios.get("/addresses/");
    return res.data;
};


export const updateadress=async(id:string,data:Address)=>{
   const res= await axios.put(`/addresses/${id}/`,data);
   return res;
};

export const addadress=async(data:Address)=>{
   const res= await axios.post("/addresses/",data);
   return res;
}