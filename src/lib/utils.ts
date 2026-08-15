import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currencySymbol: string = '$', rate: number = 1): string {
  const converted = amount * rate;
  if (currencySymbol === '¥') {
    return `${currencySymbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currencySymbol}${converted.toFixed(2)}`;
}
