import { Star } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { itemupdate, itemwithproductid } from "../types/Cart";
import { addtocart, addtocartproductid } from "../API/CartAPI";
import { useCart } from "./CartIdContext";
import type { Id } from "../types/ProductsList";

type Productcardtype = {
  id:number;
  name: string;
  description: string;
  starting_price: number;
  review_avg?: number;
  review_number?: number;
  imageUrl?: string;
  version?:Id[];
}

export default function Productcard({ 
  name,
  description,
  starting_price,
  review_avg = 0,
  review_number = 0,
  imageUrl,
  id,
  version
}: Productcardtype) {
  const {cart,fetchCart} = useCart();
  const filledStars = Math.floor(review_avg);
   const [hovered,sethovered]=useState<boolean>(false)
   const navigate=useNavigate();
   const goToproductdetails=()=>navigate(`/product/${id}`)
   const addtocarts = async (data:itemupdate) =>{
    try{
    await addtocart(data);
    }catch(error){
     console.error(error)
    }
   }
  const addtocartproduct = async (data:itemwithproductid) =>{
    try{
    await addtocartproductid(data);
    }catch(error){
     console.error(error)
    }
   }
   return (
    
    <div className="relative isolate cursor-pointer">
      {/* Changed: Added transform-gpu and will-change-transform for better performance */}
      <div 
      onMouseEnter={() => sethovered(true)}
        onMouseLeave={() => sethovered(false)} className="h-[350px] relative z-0 hover:z-[999]  transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-200 hover:bg-gray-200 bg-white flex flex-col justify-center items-start gap-2 p-4  shadow-sm hover:shadow-lg
        
        ">
        {/* Image container */}
        <div onClick={goToproductdetails} className="w-[160px] h-[120px] bg-white flex items-center justify-center mx-1">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Star ratings */}
        <div className="flex items-center justify-center mt-2 gap-[3px]">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < filledStars
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-400 font-semibold text-xs ml-1">
            Reviews ({review_number})
          </span>
        </div>
        
        {/* Product description */}
        <p className="text-[12px] font-[500] w-[160px] line-clamp-3 uppercase">
          {description} the most powerful device in world war 3 this really sucks 
        </p>
        
        {/* Pricing */}
        <p className="font-bold text-sm text-gray-400 line-through">
          ${starting_price.toFixed(2)} 
        </p>
        
        <p className="font-bold text-lg">
          ${starting_price.toFixed(2)} 
        </p>
        <button onClick={() => {
  if (version && version.length > 0) {
    if (cart?.id === undefined) {
      console.error("Cart ID is undefined. Cannot add to cart.");
      return;
    }
    const data: itemupdate = {
      cart: cart.id,
      version: version[0].id, // pick the first version or show a version selector
      quantity: 1,
      input_color_id: version[0].colors[0].id
    };
    addtocarts(data);
    fetchCart();
  } else {
    if (cart?.id === undefined) {
      console.error("Cart ID is undefined. Cannot add to cart.");
      return;
    }
    const data: itemwithproductid = {
      cart:cart?.id,
      product_id: id,
      quantity: 1
    };
    addtocartproduct(data);
    fetchCart();
  }
}} className={` ${hovered? "flex flex-row items-center justify-center gap-2 py-2 px-6 border-[2.1px] hover:bg-[#b7c9ee] border-[#0156FF] rounded-3xl "
        : "hidden"
        }`}>
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4574 16.8334C12.01 16.8334 12.5399 16.6139 12.9306 16.2232C13.3213 15.8325 13.5408 15.3026 13.5408 14.7501C13.5408 14.1975 13.3213 13.6676 12.9306 13.2769C12.5399 12.8862 12.01 12.6667 11.4574 12.6667C10.9049 12.6667 10.375 12.8862 9.9843 13.2769C9.59359 13.6676 9.3741 14.1975 9.3741 14.7501C9.3741 15.3026 9.59359 15.8325 9.9843 16.2232C10.375 16.6139 10.9049 16.8334 11.4574 16.8334ZM4.16577 16.8334C4.7183 16.8334 5.24821 16.6139 5.63891 16.2232C6.02961 15.8325 6.2491 15.3026 6.2491 14.7501C6.2491 14.1975 6.02961 13.6676 5.63891 13.2769C5.24821 12.8862 4.7183 12.6667 4.16577 12.6667C3.61323 12.6667 3.08333 12.8862 2.69263 13.2769C2.30193 13.6676 2.08243 14.1975 2.08243 14.7501C2.08243 15.3026 2.30193 15.8325 2.69263 16.2232C3.08333 16.6139 3.61323 16.8334 4.16577 16.8334ZM17.747 2.16987C18.0071 2.16149 18.2536 2.05229 18.4346 1.86538C18.6156 1.67846 18.7168 1.42849 18.7168 1.16831C18.7168 0.908135 18.6156 0.658159 18.4346 0.471245C18.2536 0.284332 18.0071 0.175135 17.747 0.166748H16.5481C15.6085 0.166748 14.796 0.818831 14.5918 1.7355L13.2866 7.61258C13.0824 8.52925 12.2699 9.18133 11.3304 9.18133H3.50535L2.00327 3.17091H11.7376C11.9952 3.15916 12.2384 3.04856 12.4165 2.86211C12.5946 2.67567 12.694 2.42773 12.694 2.16987C12.694 1.91201 12.5946 1.66408 12.4165 1.47763C12.2384 1.29119 11.9952 1.18059 11.7376 1.16883H2.00327C1.69875 1.16874 1.39823 1.23808 1.12453 1.37157C0.85084 1.50507 0.611185 1.69921 0.423786 1.93923C0.236387 2.17925 0.106178 2.45884 0.0430584 2.75674C-0.0200634 3.05464 -0.0144329 3.36302 0.0595188 3.65841L1.5616 9.66675C1.66989 10.1003 1.92003 10.4852 2.27224 10.7602C2.62444 11.0352 3.05849 11.1845 3.50535 11.1845H11.3304C12.242 11.1846 13.1265 10.8738 13.8376 10.3033C14.5488 9.73287 15.0441 8.93693 15.2418 8.04695L16.5481 2.16987H17.747Z" fill="#0156FF"/>
</svg>

          <span className="font-semibold text-[#0156FF]">
            Add To Cart
          </span>
        </button>
      </div>
    </div>
  );
}