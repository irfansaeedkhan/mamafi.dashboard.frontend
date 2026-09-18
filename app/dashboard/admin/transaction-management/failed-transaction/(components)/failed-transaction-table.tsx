// components/admin/transaction-management/failed-transaction-table.tsx
'use client';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMemo, useState } from 'react';
dayjs.extend(customParseFormat);

import { FailTransactionIcon, SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';

import { Column, DataTableNew } from '../../../admin_components/data-table';
import { useNumberFormatter } from '../../../admin_components/use-number-formatter';

import { transactionData as rawData } from './constant';

interface RawEntry {
  id: string;
  userId: string;
  type: string;
  dateTime: string;
  status: string;
  amount: string;
  method: string;
}

type TableRow = RawEntry & {
  __parsedDate: Date;
  amountNum: number;
};

export default function FailedTransactionTable() {
  const [searchText, setSearchText] = useState('');

  const formatNumber = useNumberFormatter();

  const normalizedRows = useMemo<TableRow[]>(() => {
    return rawData.map((row: RawEntry) => {
      const [day, month, yearPart, timePart, meridiem] = row.dateTime.split(' ');
      const parsedDate = new Date(`${month} ${day}, ${yearPart} ${timePart} ${meridiem}`);

      const numericAmount = Number(row.amount.replace(/[^0-9.-]+/g, ''));

      return {
        ...row,
        __parsedDate: parsedDate,
        amountNum: numericAmount,
      };
    });
  }, []);

  const filteredRows = useMemo<TableRow[]>(() => {
    return normalizedRows.filter(row => {
      const haystack = `${row.id} ${row.method}`.toLowerCase();
      const textMatch = searchText
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every(tok => haystack.includes(tok));

      return textMatch;
    });
  }, [normalizedRows, searchText]);

  const totalCount = filteredRows.length;

  const columns: Column<TableRow>[] = [
    {
      key: 'id',
      header: 'Transaction ID',
      accessor: 'id',
    },
    {
      key: 'userId',
      header: 'UserID Associated',
      accessor: 'userId',
    },
    {
      key: 'type',
      header: 'Type',
      accessor: 'type',
      filterOptions: ['Deposit', 'Withdrawal', 'Purchase'],
      renderCell: row => <span>{row.type}</span>,
    },
    {
      key: 'dateTime',
      header: 'Date and time',
      accessor: 'dateTime',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      renderCell: row => {
        if (row.status === 'Successful') {
          return <span className="text-brand-mint">{row.status}</span>;
        } else if (row.status === 'Pending') {
          return <span className="text-white">{row.status}</span>;
        } else {
          return <span className="text-brand-red">{row.status}</span>;
        }
      },
    },
    {
      key: 'amountNum',
      header: 'Amount',
      renderCell: row => <span>{formatNumber(row.amountNum)} USD</span>,
      sortable: true,
    },
    {
      key: 'method',
      header: 'Method',
      accessor: 'method',
    },
    {
      key: 'errorCode',
      header: 'Error Code',
      renderCell: row => <span>{row.method}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: row => (
        <div className="flex items-center justify-center gap-2">
          <Button title="View" variant="confirm" size="sm" compact className="capitalize" />
          <Button title="Retry" variant="confirm-secondary" size="sm" compact className="capitalize" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-primary px-2 pb-20 pt-5 font-sans text-white">
      <main className="space-y-6">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-6 rounded-xl">
            <h2 className="text-gradient text-2xl font-semibold">Failed Transactions</h2>
            <div className="flex items-center gap-4">
              <div className="mr-4">
                <FailTransactionIcon />
              </div>
              <div className="flex flex-col text-start">
                <p className="text-sm">Failed Transactions</p>
                <p className="text-3xl text-brand-red">{formatNumber(totalCount)}</p>
              </div>
            </div>
          </div>

          {/* Right: Breadcrumb + Search Box */}
          <div className="relative flex flex-col items-end justify-between gap-4">
            {/* Breadcrumb */}
            <p className="text-sm text-white">
              Transaction Management&nbsp;
              <span className="text-white">›</span>
              &nbsp;
              <span className="text-white">Failed Transactions</span>
            </p>

            {/* SEARCH box (searches by ID + method) */}
            <div className="relative w-[420px]">
              <input
                type="text"
                placeholder="Search by transaction ID, method…"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="search-input w-full rounded-full box-3d bg-dark px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
              />
              <SearchNormalIcon
                className="
                absolute right-4 top-1/2 h-6 
                w-6 -translate-y-1/2 text-white
              "
              />
            </div>
          </div>
        </div>

        {/* ─── TABLE ───────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto rounded-xl">
          <DataTableNew<TableRow> columns={columns} data={filteredRows} pageSize={10} />
        </div>
      </main>
    </div>
  );
}
