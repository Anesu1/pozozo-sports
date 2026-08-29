'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecom_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (items: CartItem[]) => {
    try {
      localStorage.setItem('ecom_cart', JSON.stringify(items));
    } catch (e) {}
  };

  const addToCart = (
    product: Product,
    color?: string,
    size?: string,
    quantity: number = 1
  ) => {
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'M';
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;

    setCart((prev) => {
      let updated: CartItem[];
      const existingIndex = prev.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [
          ...prev,
          {
            id: itemId,
            product,
            color: selectedColor,
            size: selectedSize,
            quantity,
          },
        ];
      }
      saveToStorage(updated);
      return updated;
    });

    showToast(`Added "${product.name}" to cart`, 'success', 'View Bag', () => setIsCartOpen(true));
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== itemId);
      saveToStorage(updated);
      return updated;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveToStorage(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
