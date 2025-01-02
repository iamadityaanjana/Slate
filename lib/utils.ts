import { Price } from "@/app/lib/supabase/supabase.types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency || undefined,
    minimumFractionDigits: 0,
  }).format((price?.unitAmount || 0) / 100);
  return priceString;
};

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log('posting,', url, data);
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log('Error in postData', { url, data, res });
    throw Error(res.statusText);
  }
  return res.json();
};