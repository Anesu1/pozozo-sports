'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types';

interface QuickViewContextType {
  quickViewProduct: Product | null;
  isQuickViewOpen: boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Deliberately doesn't clear quickViewProduct — the modal's exit animation
  // still needs product data to render while it fades/scales out.
  const closeQuickView = () => setIsQuickViewOpen(false);

  return (
    <QuickViewContext.Provider value={{ quickViewProduct, isQuickViewOpen, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
}
