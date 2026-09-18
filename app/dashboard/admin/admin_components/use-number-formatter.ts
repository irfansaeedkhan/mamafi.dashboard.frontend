import { useMemo } from 'react';

export function useNumberFormatter() {
  const fmt = useMemo(() => new Intl.NumberFormat('en-US'), []);
  return (n: number) => fmt.format(n);
}
