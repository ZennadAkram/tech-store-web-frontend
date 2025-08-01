import { useEffect, useState } from "react";
import {brandlist} from "../API/BrandListAPI"
import type { Brand } from "../types/ProductsList";

export function Brandbar(){
    const[brands,setBrands]=useState<Brand[]> ([]);
    
    useEffect(()=>{
    const fetchbrand= async ()=>{
        try{
       const data= await brandlist(1);
       console.log("the brands are",data.results);
       setBrands(data.results);
        }catch(error){
          console.error("Error fetching products:", error);
        }
      
      };
      fetchbrand();
    },[]);
    return (
        <>
        <div className="grid p-0 grid-cols-2  lg:grid-cols-7 md:grid-cols-3 md:row-span-3  md:h-auto md:gap-6 md:w-auto
        
        lg:grid-rows-1 lg:w-full justify-items-center items-center lg:h-32">
  {brands.slice(0, 7).map((brand) => (
    <div
      key={brand.name}
      className=" cursor-pointer flex justify-center items-center h-full w-full  bg-white hover:brightness-[100%] hover:contrast-[83%] hover:opacity-90 transition-colors duration-300"
    >
      <img
        src={brand.image}
        alt={brand.name}
        className="w-[120px] h-32 lg:max-h-[100px] object-contain transition duration-300 "
      />
    </div>
  ))}
</div>
        </>
    );
    
}