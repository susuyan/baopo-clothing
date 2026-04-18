"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  CartItem,
  loadCart,
  saveCart,
  addCartItem,
  updateCartQty as _updateQty,
  removeCartItem as _removeItem,
  cartTotalQty,
  cartTotalPrice,
} from "@/lib/cart";
import { Product } from "@/lib/data";

interface CartContextType {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;
  addItem: (product: Product, qty: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalQty: 0,
  totalPrice: 0,
  addItem: () => {},
  updateQty: () => {},
  removeItem: () => {},
  clearCart: () => {},
  toast: null,
  showToast: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setItems(loadCart());
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const addItem = useCallback(
    (product: Product, qty: number) => {
      const next = addCartItem(loadCart(), product, qty);
      saveCart(next);
      setItems(next);
      showToast("已加入采购清单");
    },
    [showToast]
  );

  const updateQty = useCallback((productId: string, qty: number) => {
    const next = _updateQty(loadCart(), productId, qty);
    saveCart(next);
    setItems(next);
  }, []);

  const removeItem = useCallback((productId: string) => {
    const next = _removeItem(loadCart(), productId);
    saveCart(next);
    setItems(next);
    showToast("已移除");
  }, [showToast]);

  const clearCart = useCallback(() => {
    saveCart([]);
    setItems([]);
  }, []);

  const totalQty = isClient ? cartTotalQty(items) : 0;
  const totalPrice = isClient ? cartTotalPrice(items) : 0;

  return (
    <CartContext.Provider
      value={{ items, totalQty, totalPrice, addItem, updateQty, removeItem, clearCart, toast, showToast }}
    >
      {children}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg animate-fade-in pointer-events-none">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
