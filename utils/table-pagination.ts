export const TABLE_PAGE_SIZE = 5;

export function getPageCount(total: number, pageSize = TABLE_PAGE_SIZE) {
  if (!total || total <= 0) return 0;
  return Math.ceil(total / pageSize);
}

export function slicePage<T>(items: T[] | null | undefined, page: number, pageSize = TABLE_PAGE_SIZE) {
  if (!items?.length) return [];
  return items.slice((page - 1) * pageSize, page * pageSize);
}

export function isNextDisabled(page: number, totalPages: number) {
  return totalPages <= 1 || page >= totalPages;
}

export function isPrevDisabled(page: number) {
  return page <= 1;
}
