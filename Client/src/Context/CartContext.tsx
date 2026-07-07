import { createContext, type PropsWithChildren, useContext, useState } from "react";
import type { Cart } from "../Model/ICart";

interface CartContextValue {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  deleteItem: (productId: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

export function useCartContext() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error("useCartContext must be used within CartContextProvider");
    }

    return context;
}



export function CartContextProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);

  function deleteItem(productId: number, quantity: number) {
    console.log(productId, quantity);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
}