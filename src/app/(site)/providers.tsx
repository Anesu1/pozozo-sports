'use client';

import React from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import { QuickViewProvider } from '@/context/QuickViewContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <QuickViewProvider>{children}</QuickViewProvider>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
