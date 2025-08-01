import {
  createContext,
  useContext,
  useState,
  
  type ReactNode,
} from "react";
import type { Cart } from "../types/Cart";
import { carteditems, deletecartitem } from "../API/CartAPI";

type CartContextType = {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
  removeitem: (itemId: number) => void;
  loading: boolean;
  error: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearCart = () => setCart(null);
  const removeitem=async (itemId:number)=>{
    try {
      await deletecartitem(itemId);
      
      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.filter(item => item.id !== itemId),
        };
      });
    } catch (err) {

      console.error("Failed to remove item from cart:", err);
      setError("Failed to remove item from cart");
      return;
    }
   
  }
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await carteditems(); // This should return { count, results: [cart] }
      setCart(data.results[0] || null); // Use the first cart (assuming one per user)
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart(null);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        clearCart,
        fetchCart,
        removeitem,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
