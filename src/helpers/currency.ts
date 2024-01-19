export const toCurrency = (
  price: number,
  currency: string = 'PLN',
  maximumFractionDigits = 2
): string => {
  if (typeof price !== 'number') {
    return price
  }
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
    maximumFractionDigits
  }).format(price)
}
