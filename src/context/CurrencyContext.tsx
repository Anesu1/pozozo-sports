'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CurrencyConfig } from '@/types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  ZMW: { code: 'ZMW', symbol: 'K', rate: 1.0, name: 'Zambian Kwacha' },
  USD: { code: 'USD', symbol: '$', rate: 0.038, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.035, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.030, name: 'British Pound' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 0.052, name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'AU$', rate: 0.058, name: 'Australian Dollar' },
  JPY: { code: 'JPY', symbol: '¥', rate: 5.8, name: 'Japanese Yen' },
};

interface CurrencyContextType {
  currency: Currency;
  config: CurrencyConfig;
  currencies: Record<Currency, CurrencyConfig>;
  setCurrency: (currency: Currency) => void;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('ZMW');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecom_currency') as Currency;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      }
    } catch (e) {}
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem('ecom_currency', newCurrency);
    } catch (e) {}
  };

  const config = CURRENCIES[currency] || CURRENCIES.ZMW;

  const format = (amount: number): string => {
    const converted = amount * config.rate;
    if (config.symbol === 'K') {
      return `K ${Math.round(converted).toLocaleString()}`;
    }
    if (config.symbol === '¥') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, config, currencies: CURRENCIES, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
