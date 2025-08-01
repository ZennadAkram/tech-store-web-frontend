import type{ ProductList } from "../types/ProductsList";
import { useState,useEffect } from "react";
import Productcard from "./Productcard";

type ProductGridProps = {
  products: ProductList[];
  slicelg:number;
  slicemd:number;
  slice:number;
};

export function ProductGrid({ products,slicelg,slicemd,slice }: ProductGridProps) {
const [numslice, setnumslice] = useState<number>(2);

useEffect(() => {
    const updateNums = () => {
      if (window.innerWidth >= 1024) {
        setnumslice(slicelg);
      } else if (window.innerWidth >= 768) {
        setnumslice(slicemd);
      } else {
        setnumslice(slice);
      }
    };
    updateNums();
    window.addEventListener("resize", updateNums);
    return () => window.removeEventListener("resize", updateNums);
  }, [slicelg, slicemd, slice]);
return (
    <div className="flex flex-row justify-between ">
        {products.slice(0, numslice).map((product) => (
            <Productcard 
            
            name={product.name} description={product.description}
            starting_price={Number(product.starting_price)}
            imageUrl={product.poster_image ?? undefined}
            review_avg={product.average_rating ?? 0}
            review_number={product.review_count}
            key={product.id}
            
            />
        ))}
    </div>
);
}

