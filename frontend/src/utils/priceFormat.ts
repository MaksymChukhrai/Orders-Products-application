export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

export const convertToEUR = (usdPrice: number): number => {
  // Simple conversion rate, in a real app you would use an API
  const conversionRate = 0.85;
  return usdPrice * conversionRate;
};

export const formatPriceUSD = (price: number): string => {
  return formatPrice(price, 'USD');
};

export const formatPriceEUR = (price: number): string => {
  return formatPrice(convertToEUR(price), 'EUR');
};