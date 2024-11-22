import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance, formatRelative } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const dateObj = new Date(date);
  return format(dateObj, 'MMM dd, yyyy');
}

export function formatRelativeDate(date: Date | string): string {
  const dateObj = new Date(date);
  return formatRelative(dateObj, new Date());
}

export function formatTimeAgo(date: Date | string | number): string {
  const dateObj = new Date(date);
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);

  if (diffHours < 24) {
    return formatDistance(dateObj, now, { addSuffix: true });
  } else if (diffHours < 48) {
    return 'Yesterday';
  } else if (diffHours < 72) {
    return '2 days ago';
  } else if (diffHours < 96) {
    return '3 days ago';
  } else {
    return format(dateObj, 'MMM d, yyyy');
  }
}

export function formatDateTime(date: Date | string): string {
  const dateObj = new Date(date);
  return format(dateObj, 'MMM dd, yyyy HH:mm');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(num / 100);
}