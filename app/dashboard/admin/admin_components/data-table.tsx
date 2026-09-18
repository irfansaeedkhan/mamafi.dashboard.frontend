'use client';

import { ArrowCircleLeft, ArrowCircleRight, ArrowDownIcon, UpDownIcon } from '@/assets/svgs';
import React, { useCallback, useMemo, useRef, useState } from 'react';

type KeyOf<T> = keyof T & string;

export type Column<T> = {
  key: string; // Can be any string (for React keys), not necessarily a key of T
  header: string | React.ReactNode;
  accessor?: KeyOf<T>; // Must be a valid key of T if provided
  sortable?: boolean;
  filterOptions?: string[];
  renderCell?: (row: T) => React.ReactNode;
  width?: string; // Optional custom width
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  theadBg?: string;
  tbodyBg?: string;
  footerBg?: string;
  hoverBg?: string;
  maxHeight?: string;
  headerHeight?: number;
  extraPadding?: number;
  wrapperClassName?: string;
  externalPagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

type Filters = Partial<Record<string, string>>;

   export function DataTableNew<T extends object>({
  columns,
  data,
  pageSize = 10,
  theadBg = 'bg-light',
  tbodyBg = 'bg-dark',
  footerBg = 'bg-dark',
  hoverBg = 'hover:bg-light',
  maxHeight,
  headerHeight = 120,
  extraPadding = 100,
  wrapperClassName = 'box-3d',
  externalPagination,
}: DataTableProps<T>) {
  // --- SORT STATE ---
  const [sortKey, setSortKey] = useState<KeyOf<T> | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  // --- FILTER STATE ---
  const [filters, setFilters] = useState<Filters>({});

  // --- PAGE STATE (internal or external) ---
  const [internalPage, setInternalPage] = useState(1);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Use external pagination if provided, otherwise use internal
  const isExternalPagination = !!externalPagination;
  const page = isExternalPagination ? externalPagination.currentPage : internalPage;
  const baseSetPage = isExternalPagination ? externalPagination.onPageChange : setInternalPage;

  const setPage = useCallback((newPage: number) => {
    baseSetPage(newPage);
    tableContainerRef.current?.scrollTo({ top: 0 });
  }, [baseSetPage]);

  // Calculate dynamic height
  const paginationHeight = 80;
  const dynamicMaxHeight =
    maxHeight || `calc(100vh - ${headerHeight + paginationHeight + extraPadding}px)`;

  //  APPLY FILTERS
  const filtered = useMemo(() => {
    return data.filter((row: T) => {
      return columns.every((col: Column<T>) => {
        // Only filter if accessor exists (col.key might be a custom key like "actions")
        if (!col.accessor) return true;
        const val = row[col.accessor];
        const f = filters[col.key];
        if (f && String(val) !== f) return false;
        return true;
      });
    });
  }, [data, filters, columns]);

  //  APPLY SORTING
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] as unknown as string | number;
      const bVal = b[sortKey] as unknown as string | number;
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  //  PAGINATION

  const totalPages = isExternalPagination
    ? externalPagination.totalPages
    : Math.ceil(sorted.length / pageSize);

  const pageData = useMemo(() => {
    if (isExternalPagination) {
      return sorted;
    }
    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [sorted, page, pageSize, isExternalPagination]);

  // TOGGLE SORT
  const toggleSort = (key: KeyOf<T>) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  // CHANGE FILTER FOR A COLUMN
  const handleFilter = (key: string, value: string) => {
    setFilters(f => ({ ...f, [key]: value }));
    setPage(1);
  };

  const paginationRange = useMemo(() => {
    const delta = 1;
    const range: (number | string)[] = [];
    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);
    if (left > 1) {
      range.push(1);
      if (left > 2) range.push('...');
    }
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) range.push('...');
      range.push(totalPages);
    }
    return range;
  }, [page, totalPages]);

  return (
    <div className="w-full max-w-none mx-auto lg:max-w-[calc(100vw-20rem)] xl:max-w-[calc(100vw-18rem)]">
      <div
        className={`overflow-hidden rounded-xl ${wrapperClassName}`}
        style={{ maxHeight: dynamicMaxHeight }}
      >
        <div
          ref={tableContainerRef}
          className="max-w-none overflow-x-auto overflow-y-auto pr-6 lg:max-w-[calc(100vw-18rem)] xl:max-w-[calc(100vw-18rem)]"
          style={{
            maxHeight:
              pageData.length !== 0
                ? `calc(${dynamicMaxHeight} - ${paginationHeight}px)`
                : dynamicMaxHeight,
          }}
        >
          <table
            className="w-full table-auto border-collapse text-xs"
            style={{ minWidth: 'max-content' }}
          >
            <thead
              className={`sticky top-0 z-10 ${theadBg} text-[10px] font-normal text-white [@media(min-width:1440px)]:text-xs [@media(min-width:1680px)]:text-sm`}
            >
              <tr>
                {columns.map((col: Column<T>) => (
                  <th
                    key={col.key}
                    className={`sticky top-0 z-20 border-b-[2px] border-dark/60 bg-inherit px-3 py-3 text-center font-normal ${
                      col.width || 'w-auto'
                    }`}
                    style={{
                      minWidth: col.width || 'auto',
                      maxWidth: col.width || 'none',
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="max-w-fit ">{col.header}</span>
                      {col.sortable && col.accessor && (
                        <button onClick={() => toggleSort(col.accessor!)} className="group shrink-0">
                          <UpDownIcon className="group-hover:[&>g]:fill-[#1C83FF]" />
                        </button>
                      )}
                      {/* Filter dropdown */}
                      {col.filterOptions && (
                        <div className="relative z-20 inline-block">
                          <button
                            onClick={() =>
                              setOpenFilterCol(openFilterCol === col.key ? null : col.key)
                            }
                            className="group shrink-0"
                          >
                            <ArrowDownIcon className="shrink-0 scale-75 group-hover:[&>path]:fill-[#1C83FF]" />
                          </button>
                          {openFilterCol === col.key && (
                            <div
                              className="absolute left-0 top-full z-30 mt-1 w-32 overflow-hidden rounded bg-dark shadow-lg"
                              onMouseLeave={() => setOpenFilterCol(null)}
                            >
                              <div
                                className="cursor-pointer px-4 py-2 hover:bg-light"
                                onClick={() => {
                                  handleFilter(col.key, '');
                                  setOpenFilterCol(null);
                                }}
                              >
                                All
                              </div>
                              {col.filterOptions.map((opt: string) => (
                                <div
                                  key={opt}
                                  className="cursor-pointer px-4 py-2 hover:bg-light"
                                  onClick={() => {
                                    handleFilter(col.key, opt);
                                    setOpenFilterCol(null);
                                  }}
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`${tbodyBg} text-white`}>
              {pageData.length > 0 ? (
                pageData.map((row: T, i: number) => (
                  <tr key={i} className={`${hoverBg} border-b border-dark/50`}>
                    {columns.map((col: Column<T>) => (
                      <td
                        key={col.key}
                        className={`px-3 py-3 text-center ${col.width || 'w-auto'}`}
                        style={{
                          minWidth: col.width || 'auto',
                          maxWidth: col.width || 'none',
                        }}
                      >
                        <div
                          className={`flex w-full items-center justify-center ${
                            col.renderCell ? 'overflow-visible' : 'truncate'
                          }`}
                        >
                          {col.renderCell
                            ? col.renderCell(row)
                            : col.accessor
                              ? String(row[col.accessor])
                              : null}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-gray-500 p-8 text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pageData.length !== 0 && (
          <div className={`flex justify-end p-4 ${footerBg} border-t border-white/10 text-sm`}>
            <nav className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  const newPage = Math.max(1, page - 1);
                  if (isExternalPagination) {
                    setPage(newPage);
                  } else {
                    setInternalPage(newPage);
                  }
                }}
                disabled={page === 1 || totalPages <= 1}
                className="disabled:opacity-50"
              >
                <ArrowCircleLeft className="shrink-0" />
              </button>
              <ul className="flex items-center justify-center gap-2">
                {paginationRange.map((item, idx) => (
                  <li key={idx}>
                    {item === '...' ? (
                      <span className="text-white">…</span>
                    ) : (
                      <button
                        onClick={() => {
                          if (isExternalPagination) {
                            setPage(item as number);
                          } else {
                            setInternalPage(item as number);
                          }
                        }}
                        className={`px-2 ${page === item ? 'text-brand-mint' : 'text-white'}`}
                      >
                        {item}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  const newPage = Math.min(totalPages, page + 1);
                  if (isExternalPagination) {
                    setPage(newPage);
                  } else {
                    setInternalPage(newPage);
                  }
                }}
                disabled={totalPages <= 1 || page >= totalPages}
                className="disabled:opacity-50"
              >
                <ArrowCircleRight className="shrink-0" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
