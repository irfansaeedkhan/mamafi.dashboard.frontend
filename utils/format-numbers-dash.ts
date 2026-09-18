export const formatNumber = (number: number): string => {
  if (typeof number !== 'number') return 'N/A';

  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
