import {fetchfiltercategory} from "../API/ProductsAPI"
import Productcard from "../components/Productcard"
import type { ProductList } from "../types/ProductsList";

import {useEffect,useState } from "react";
import { Brandbar } from "./brandsbar";

export function Navbardesk(){
     const [products, setProducts] = useState<ProductList[]>([]);
    
  useEffect(() => {
  const testFetch = async () => {
    try {
      const data = await fetchfiltercategory("Phones");
      setProducts(data.results);

      // ✅ Log once, after fetching
      data.results.forEach((product) => console.log(product.id));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  testFetch();
}, []);

  return (
    <>
    {/* main container */}
    <div className="flex flex-col w-[80vw]  bg-white border-[0.4px] border-gray-200 shadow-lg">
    {/* Upper container */}
    <div className="flex flex-row   justify-start ">
        <div className="text-sm  font-bold flex flex-col gap-1 w-[25%] border-r-[0.4px] border-b-[0.4px] border-gray-300">
         <div className="  px-5 h-11  flex items-center justify-start cursor-pointer hover:bg-[#F5F7FF]">
             <span>Everyday Use Notebooks</span>
         </div>
         <div className=" px-5 h-11 flex items-center justify-start cursor-pointer hover:bg-[#F5F7FF]">
             <span>Gaming Laptops</span>
         </div>
         <div className=" px-5 h-11 flex items-center justify-start cursor-pointer hover:bg-[#F5F7FF]">
             <span>Tablets & Pads</span>
         </div>
         <div className=" px-5 h-11 flex items-center justify-start cursor-pointer hover:bg-[#F5F7FF]">
             <span>Everyday Use Notebooks</span>
         </div>
        </div>
       <div className="border-b-[0.4px] border-gray-300  w-full">
          <ul className="grid grid-cols-4 grid-rows-1 gap-4">
  {products.slice(0, 4).map((product) => {
    
    return (
      <li key={product.id}>
        <Productcard
          name={product.name}
          imageUrl={product.poster_image ?? undefined}
          starting_price={Number(product.starting_price)}
          description={product.description}
          review_avg={4}
          review_number={5} id={product.id}        />
      </li>
    );
  })}
</ul>
       </div>
    </div>

    {/* brand container */}
 <Brandbar/>


    </div>
    </>
  );
}