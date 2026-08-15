'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecom_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (items: Product[]) => {
    try {
      localStorage.setItem('ecom_wishlist', JSON.stringify(items));
    } catch (e) {}
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      let updated: Product[];
      if (prev.some((item) => item.id === product.id)) {
        updated = prev.filter((item) => item.id !== product.id);
        showToast(`Removed "${product.name}" from wishlist`, 'info');
      } else {
        updated = [...prev, product];
        showToast(`Saved "${product.name}" to wishlist`, 'success');
      }
      saveToStorage(updated);
      return updated;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      saveToStorage(updated);
      return updated;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    saveToStorage([]);
    showToast('Wishlist cleared', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        count: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
