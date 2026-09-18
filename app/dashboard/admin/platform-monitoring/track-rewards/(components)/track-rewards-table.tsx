// components/admin/transaction-management/track-rewards-table.tsx
'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { useMemo, useState } from 'react';
import { Column, DataTableNew } from '../../../admin_components/data-table';
import ViewRewardModal from './view-reward-modal';

type Reward = {
  period: string;
  paymentDate: string;
  type: 'Affiliate' | 'Meta-Asset Earnings';
  status: 'Payed' | 'Suspended' | 'To Pay Next Cycle';
  users: number;
  amount: number;
};

export default function TrackRewardsTable() {
  const [filterText, setFilterText] = useState('');
  const [selected, setSelected] = useState<Reward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rewards: Reward[] = useMemo(
    () => [
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Affiliate',
        status: 'To Pay Next Cycle',
        users: 12,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Meta-Asset Earnings',
        status: 'Payed',
        users: 130,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Affiliate',
        status: 'Suspended',
        users: 45,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Meta-Asset Earnings',
        status: 'To Pay Next Cycle',
        users: 12,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Affiliate',
        status: 'Payed',
        users: 130,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Meta-Asset Earnings',
        status: 'Suspended',
        users: 45,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Affiliate',
        status: 'To Pay Next Cycle',
        users: 12,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Meta-Asset Earnings',
        status: 'Payed',
        users: 130,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Affiliate',
        status: 'Suspended',
        users: 45,
        amount: 1200,
      },
      {
        period: '20/2024',
        paymentDate: '12 JAN 2024 10:12 am',
        type: 'Meta-Asset Earnings',
        status: 'To Pay Next Cycle',
        users: 14,
        amount: 1200,
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = filterText.toLowerCase().trim();
    return rewards.filter(r => ` ${r.type} ${r.status}`.toLowerCase().includes(q));
  }, [filterText, rewards]);

  const getStatusColor = (status: Reward['status']) => {
    if (status === 'Payed') return 'text-brand-mint';
    if (status === 'Suspended') return 'text-brand-red';
    return 'text-white';
  };

  const columns: Column<Reward>[] = [
    { key: 'period', header: 'Reward Period', accessor: 'period' },
    {
      key: 'paymentDate',
      header: 'Date and time of Payment',
      accessor: 'paymentDate',
    },
    {
      key: 'type',
      header: 'Type',
      accessor: 'type',
      filterOptions: ['Affiliate', 'Meta-Asset Earnings'],
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      filterOptions: ['Payed', 'Suspended', 'To Pay Next Cycle'],
      renderCell: row => <span className={getStatusColor(row.status)}>{row.status}</span>,
    },
    { key: 'users', header: 'Users Involved', accessor: 'users' },
    {
      key: 'amount',
      header: 'Total Reward Amount',
      accessor: 'amount',
      renderCell: row => `$${row.amount.toLocaleString()}`,
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: row => (
        <div className="flex gap-2">
          <Button
            title="View Reward"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => {
              setSelected(row);
              setIsModalOpen(true);
            }}
          />
          {row.status === 'Payed' ? (
            <Button
              title="Restore"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
            />
          ) : (
            <Button
              title="Suspend"
              variant="confirm-danger"
              size="sm"
              compact
              className="capitalize"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-900 p-4 text-white">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-gradient text-2xl font-bold">Track Rewards</h2>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by type, status"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl">
        <DataTableNew<Reward> columns={columns} data={filtered} pageSize={5} />
      </div>

      <ViewRewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventData={selected || {}}
      />
    </div>
  );
}
