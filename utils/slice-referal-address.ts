export const sliceReferalAddress = (address: string) => {
  return `${address?.slice(0, 25)}...${address?.slice(-6)}`;
};
