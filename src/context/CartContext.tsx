import React, { createContext, useContext, ReactNode } from "react";
import { useCart, useAddToCart } from "@/hooks/useCart";
import { UseMutationResult } from "@tanstack/react-query";

interface CartContextType {
  cart: any;
  isLoading: boolean;
  addToCart: UseMutationResult<any, Error, number, unknown>['mutate'];
  isAddingToCart: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: cart, isLoading } = useCart();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  return (
    <CartContext.Provider value={{ cart, isLoading, addToCart, isAddingToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};