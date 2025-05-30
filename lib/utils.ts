import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTimestamp(timestamp: string): { date: string; time: string } {
  const dateObj = new Date(timestamp);
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getUTCFullYear()).slice(-2);
  const hour = String(dateObj.getUTCHours()).padStart(2, '0');
  return {
    date: `${day}/${month}/${year}`,
    time: hour
  };
}
