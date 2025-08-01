import {  X } from "lucide-react";
import { useState } from "react";
import { deletecartitem } from "../API/CartAPI";


type CartcardProp = {
    id:number;
    price: number;
    image: string;
    description: string;
    quan: number;
    index:number;
    quantityitem:number;
    onRemove?: (index: number) => void;
    subtotal: (price: number, index: number) => void;
    onUpdate?: (index:number,quantity:number)=>void;
}


export function Cartcard({ price, image, description,id, quan,quantityitem, subtotal,onUpdate,index,onRemove }: CartcardProp) {
    const [quantity, setquantity] = useState<number>(quantityitem);
    
     const deleteitem=async(id:number)=>{
        try{
         await deletecartitem(id);
           
         if (onRemove) {
             onRemove(index);
         }
        }catch(error){
            console.error(error)
        }
     }   
    

    return (
        <div key={index} className="flex flex-col gap-4 border-b border-b-[#CACDD8] pb-6 lg:flex-row lg:justify-between">
            {/* pic and desc container */}
            <div className="flex flex-row gap-4 w-full">
                <img src={image} className="h-[100px] w-[100px] object-cover" alt="product" />
                <div className="flex-1 min-w-0 lg:w-[100px]">
                    <p className="text-[13px] line-clamp-3 font-medium overflow-hidden text-ellipsis">
                        {description}
                    </p>
                </div>
            </div>

            {/* price and quantity container */}
            <div className="flex flex-row justify-between lg:w-96 lg:gap-16 lg:justify-start">
                <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-bold">Price</span>
                    <span className="text-[13px] font-bold">${price.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-bold">Qty</span>
                    <div className="flex flex-row items-center py-1 rounded-[6px] px-2 bg-[#F5F7FF] gap-3">
                        <span className="text-sm font-semibold">{quantity}</span>
                        <div className="flex flex-col">
                            <button 
                                disabled={quantity === quan} 
                                onClick={() => { setquantity(quantity + 1); if(onUpdate){onUpdate(index,quantity+1); subtotal(price * (quantity+1),index)} }} 
                                className={`${quantity === quan ? "opacity-50 cursor-not-allowed" : ""}`}
                            > 
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9.23999L8 7.23999L10 9.23999" stroke="#A2A6B0" strokeWidth="1.6" strokeLinecap="round"/>
                                </svg>
                            </button>
                            <button 
                                disabled={quantity === 1} 
                                onClick={() => { setquantity(quantity - 1); if(onUpdate){onUpdate(index,quantity-1); subtotal(price *( quantity-1),index)} }} 
                                className={`${quantity === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                            >
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 8.16016L8 10.1602L6 8.16016" stroke="#A2A6B0" strokeWidth="1.6" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-bold">Subtotal</span>
                    <span className="text-[13px] font-bold">${(price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex flex-col justify-center gap-3">
                    <button onClick={()=>{deleteitem(id); subtotal(0,index)}} className="text-[#A1A1A1] hover:bg-[#eeebeb] p-1 border-[3px] rounded-full">
                        <X className="h-5 w-5"/>
                    </button>
                   
                </div>
            </div>
        </div>
    );
}