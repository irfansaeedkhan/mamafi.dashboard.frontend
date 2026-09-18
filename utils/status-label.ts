export function getStatusDisplay(status?: string | null) {
  const normalized = (status ?? '').toUpperCase();
  if (normalized === 'CONFIRMED' || normalized === 'COMPLETED' || normalized === 'APPROVED') {
    return { label: 'Approved', className: 'text-brand-mint' };
  }
  if (normalized === 'PENDING') {
    return { label: 'Pending', className: 'text-[#D80027]' };
  }
  if (normalized === 'REJECTED' || normalized === 'FAILED' || normalized === 'DECLINED') {
    return { label: 'Rejected', className: 'text-brand-red' };
  }
  return { label: status || 'N/A', className: 'text-white' };
}
