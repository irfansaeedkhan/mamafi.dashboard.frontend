'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { useMemo, useState } from 'react';
import { Column, DataTableNew } from '../../../admin_components/data-table';
import { useNumberFormatter } from '../../../admin_components/use-number-formatter';

type Transaction = {
  id: string;
  userId: string;
  date: string;
  status: 'Successful' | 'Failed' | 'Pending';
  amount: number;
  method: 'Wallet' | 'Bank Transfer' | 'Credit Card';
  errorMsg: string;
};

export default function LargePurchasingTable() {
  const [filterText, setFilterText] = useState('');
  const formatNumber = useNumberFormatter();

  const transactions: Transaction[] = useMemo(
    () => [
      {
        id: '133780776823468',
        userId: '12175688',
        date: '12 JAN 2024 10:12 am',
        status: 'Successful',
        amount: 1200,
        method: 'Wallet',
        errorMsg: 'N/A',
      },
      {
        id: '133780776823469',
        userId: '12175689',
        date: '13 JAN 2024 11:45 am',
        status: 'Failed',
        amount: 1500,
        method: 'Bank Transfer',
        errorMsg: 'Insufficient funds',
      },
      {
        id: '133780776823470',
        userId: '12175690',
        date: '14 JAN 2024 09:30 am',
        status: 'Pending',
        amount: 900,
        method: 'Wallet',
        errorMsg: 'N/A',
      },
      {
        id: '133780776823471',
        userId: '12175691',
        date: '15 JAN 2024 02:20 pm',
        status: 'Failed',
        amount: 2000,
        method: 'Bank Transfer',
        errorMsg: 'Network error',
      },
      {
        id: '133780776823472',
        userId: '12175692',
        date: '16 JAN 2024 08:15 am',
        status: 'Pending',
        amount: 1100,
        method: 'Wallet',
        errorMsg: 'N/A',
      },
    ],
    []
  );

  const filteredTransactions = useMemo(() => {
    const tokens = filterText.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return transactions;

    return transactions.filter(tx => {
      const haystack = `${tx.id} ${tx.userId} ${tx.method}`.toLowerCase().trim();
      return tokens.every(tok => haystack.includes(tok));
    });
  }, [filterText, transactions]);

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Successful':
        return 'text-brand-mint';
      case 'Failed':
        return 'text-brand-red';
      case 'Pending':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const columns: Column<Transaction>[] = [
    { key: 'id', header: 'Transaction ID', accessor: 'id' },
    {
      key: 'userId',
      header: 'User ID Associated',
      accessor: 'userId',
    },
    {
      key: 'date',
      header: 'Date and Time',
      accessor: 'date',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      filterOptions: ['Successful', 'Failed', 'Pending'],
      renderCell: row => <span className={getStatusColor(row.status)}>{row.status}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      sortable: true,
      renderCell: row => <>{formatNumber(row.amount)} USD</>,
    },
    {
      key: 'method',
      header: 'Method',
      accessor: 'method',
      filterOptions: ['Wallet', 'Bank Transfer', 'Credit Card'],
    },
    {
      key: 'errorMsg',
      header: 'Error Code/Message',
      accessor: 'errorMsg',
      renderCell: row => <span className="text-gray-400">{row.errorMsg}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: () => (
        <div className="flex gap-2">
          <Button
            title="View Transaction"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
          />
          <Button
            title="Export Detail Report"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-900 p-4 text-white">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Large Purchases</h2>
        </div>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by transaction ID, user ID, method…"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* ─────────── DataTableNew ─────────── */}
      <div className="bg-gray-800 overflow-hidden rounded-xl">
        <DataTableNew<Transaction> columns={columns} data={filteredTransactions} pageSize={5} />
      </div>
    </div>
  );
}
