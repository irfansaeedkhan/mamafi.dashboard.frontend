// components/admin/wallet-balance.tsx
'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { Column, DataTableNew } from '../../../admin_components/data-table';
import { useNumberFormatter } from '../../../admin_components/use-number-formatter';
import AdminTransferModal from './admin-transfer-modal';
import TransferAmountModal from './transfer-amount-modal';

/**
 * Dummy data for the “User Wallets” table.
 */
const STATUS_DATA = Array.from({ length: 25 }).map((_, i) => {
  const statuses = ['Active', 'Inactive', 'Locked'] as const;
  const methods = ['Bank Transfer', 'Wallet', 'Credit Card'] as const;

  return {
    id: (12150000 + i).toString(),
    username: `user${i + 1}`,
    walletAmount: (i + 1) * 1200,
    lastActivity: ['12 JAN 2024 10:12 am', '15 FEB 2024 02:05 pm', '20 MAR 2024 09:30 am'][i % 3],
    status: statuses[i % statuses.length],
    method: methods[i % methods.length],
  };
});

/**
 * Dummy data for the “Admin Wallets” table.
 */
const ADMIN_WALLET_DATA = Array.from({ length: 18 }).map((_, i) => {
  const names = ['Main', 'Rewards', 'Commissions', 'Income'] as const;
  return {
    name: names[i % names.length],
    walletAmount: (i + 5) * 2000,
    lastActivity: ['27 JAN 2024 10:12 am', '26 JAN 2024 08:45 pm'][i % 2],
  };
});

type UserRow = {
  id: string;
  username: string;
  walletAmount: number;
  lastActivity: string;
  status: string;
  method: string;
};

type AdminRow = {
  name: string;
  walletAmount: number;
  lastActivity: string;
};

export default function WalletBalance() {
  const [activeTab, setActiveTab] = useState<'user' | 'admin' | 'stats'>('user');

  const [filterText, setFilterText] = useState('');

  // ── Modal states
  const [isOldModalOpen, setIsOldModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);

  const pathname = usePathname();
  const formatPath = (path: string) => {
    const segments = path.split('/');
    const last = segments[segments.length - 1];
    return last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const formatNumber = useNumberFormatter();

  // ────────────────────────────────────────────────────────────────────────────────
  // 1) Columns for “User Wallets”
  // ────────────────────────────────────────────────────────────────────────────────

  interface UserActionsProps {
    row: UserRow;
    setIsOldModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const userColumns: Column<UserRow>[] = useMemo(
    (): Column<UserRow>[] => [
      { key: 'id', header: 'User ID', accessor: 'id' },
      { key: 'username', header: 'Username', accessor: 'username' },
      {
        key: 'walletAmount',
        header: 'Wallet Amount',
        accessor: 'walletAmount',
        sortable: true,
        renderCell: (row: UserRow): React.JSX.Element => <span>${formatNumber(row.walletAmount)}</span>,
      },
      {
        key: 'lastActivity',
        header: 'Last Activity',
        accessor: 'lastActivity',
      },
      {
        key: 'status',
        header: 'Status',
        accessor: 'status',
        filterOptions: ['Active', 'Inactive', 'Locked'],
        renderCell: (row: UserRow): React.JSX.Element => {
          let cls = '';
          if (row.status === 'Active') cls = 'text-brand-mint';
          else if (row.status === 'Inactive') cls = 'text-white';
          else cls = 'text-brand-red';
          return <span className={cls}>{row.status}</span>;
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        renderCell: (_row: UserRow): React.JSX.Element => (
          <div className="flex items-center justify-start gap-2">
            <Button
              variant="confirm"
              title="View User"
              size="sm"
              compact
            />
            <Button
              variant="confirm-danger"
              title="Lock"
              size="sm"
              compact
            />
            <Button
              variant="confirm"
              title="Transfer Amount"
              size="sm"
              compact
              onClick={(): void => {
                setIsOldModalOpen(true);
              }}
            />
          </div>
        ),
      },
    ],
    [formatNumber]
  );

  // ────────────────────────────────────────────────────────────────────────────────
  // 2) Columns for “Admin Wallets”
  // ────────────────────────────────────────────────────────────────────────────────

  interface AdminActionsProps {
    row: AdminRow;
    setIsSimpleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const adminColumns: Column<AdminRow>[] = useMemo(
    () => [
      { key: 'name', header: 'Admin Wallet Name', accessor: 'name' },
      {
        key: 'walletAmount',
        header: 'Wallet Amount',
        accessor: 'walletAmount',
        sortable: true,
        renderCell: (row: AdminRow) => <span>${formatNumber(row.walletAmount)}</span>,
      },
      {
        key: 'lastActivity',
        header: 'Last Activity',
        accessor: 'lastActivity',
      },
      {
        key: 'actions',
        header: 'Actions',
        renderCell: (_row: AdminRow) => (
          <div className="flex items-center justify-start gap-2">
            <Button
              variant="confirm"
              title="View User"
              size="sm"
              compact
            />
            <Button
              variant="confirm-secondary"
              title="Retry"
              size="sm"
              compact
            />
            <Button
              variant="confirm"
              title="Transfer Amount"
              size="sm"
              compact
              onClick={() => {
                // Open the “no‐tabs” simple modal for Admin
                setIsSimpleModalOpen(true);
              }}
            />
          </div>
        ),
      },
    ],
    [formatNumber]
  );

  // ────────────────────────────────────────────────────────────────────────────────
  // 3) Filtered Data (search logic):
  //    - Users: filter by ID or username
  //    - Admin: filter by wallet name
  // ────────────────────────────────────────────────────────────────────────────────

  const filteredUserData = useMemo(() => {
    return STATUS_DATA.filter(row => {
      const haystack = `${row.id} ${row.username}`.toLowerCase();
      return filterText
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every(tok => haystack.includes(tok));
    });
  }, [filterText]);

  const filteredAdminData = useMemo(() => {
    return ADMIN_WALLET_DATA.filter(row => {
      const haystack = row.name.toLowerCase();
      return filterText
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every(tok => haystack.includes(tok));
    });
  }, [filterText]);

  return (
    <>
      <div className="bg-primary p-6 text-white">
        <main className="space-y-6">
          <div className="flex flex-col gap-6 rounded-xl">
            <div className="flex w-full items-center justify-between">
              {/* Title */}
              <h2 className="text-2xl font-semibold">
                <span className="text-white bg-clip-text">Wallet Balance & Management</span>
              </h2>
              <p className="text-sm text-white">
                Transaction Management&nbsp;
                <ChevronRight className="inline h-4 w-4 text-white" />
                &nbsp;{formatPath(pathname)}
              </p>
            </div>

            {/* Tabs */}
            <ul className="flex gap-4 bg-dark pt-3 text-center">
              <li
                className={`cursor-pointer px-6 pb-2 text-sm ${
                  activeTab === 'user' ? 'border-green border-b-2 text-brand-mint' : 'text-gray-400'
                }`}
                onClick={() => {
                  setActiveTab('user');
                  setFilterText('');
                }}
              >
                User Wallets
              </li>
              <li
                className={`cursor-pointer px-6 pb-2 text-sm ${
                  activeTab === 'admin'
                    ? 'border-green border-b-2 text-brand-mint'
                    : 'text-gray-400'
                }`}
                onClick={() => {
                  setActiveTab('admin');
                  setFilterText('');
                }}
              >
                Admin Wallets
              </li>
              <li
                className={`cursor-pointer px-6 pb-2 text-sm ${
                  activeTab === 'stats'
                    ? 'border-green border-b-2 text-brand-mint'
                    : 'text-gray-400'
                }`}
                onClick={() => {
                  setActiveTab('stats');
                  setFilterText('');
                }}
              >
                Statistics
              </li>
            </ul>

            <div className="flex w-full items-center justify-between pt-6">
              {activeTab === 'user' && (
                <div>
                  <p className="text-sm">Users Wallet Balance</p>
                  <p className="text-4xl text-brand-mint">
                    ${formatNumber(filteredUserData.reduce((sum, r) => sum + r.walletAmount, 0))}
                  </p>
                </div>
              )}
              {activeTab === 'admin' && (
                <div>
                  <p className="text-sm">Admin Wallet Balance</p>
                  <p className="text-4xl text-brand-mint">
                    ${formatNumber(filteredAdminData.reduce((sum, r) => sum + r.walletAmount, 0))}
                  </p>
                </div>
              )}
              {activeTab === 'stats' && (
                <div>
                  <p className="text-sm">Statistics</p>
                  <p className="text-4xl text-brand-mint">
                    {formatNumber(filteredUserData.length + filteredAdminData.length)} Entries
                  </p>
                </div>
              )}

              <div className="relative w-[420px]">
                <input
                  type="text"
                  placeholder={
                    activeTab === 'user'
                      ? 'Search by user ID, username…'
                      : activeTab === 'admin'
                        ? 'Search by wallet name…'
                        : 'Search…'
                  }
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                  className="search-input w-full rounded-full box-3d bg-dark px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
                />

                <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white" />
              </div>
            </div>
          </div>

          {/* ─── “User Wallets” Table ───────────────────────────────────────────── */}
          {activeTab === 'user' && (
            <div className="overflow-x-auto rounded-xl bg-light">
              <DataTableNew<UserRow> columns={userColumns} data={filteredUserData} pageSize={7} />
            </div>
          )}

          {/* ─── “Admin Wallets” Table ─────────────────────────────────────────── */}
          {activeTab === 'admin' && (
            <div className="overflow-x-auto rounded-xl">
              <DataTableNew<AdminRow>
                columns={adminColumns}
                data={filteredAdminData}
                pageSize={7}
              />
            </div>
          )}

          {/* ─── “Statistics” Tab ────────────────────────────────────────────────── */}
          {activeTab === 'stats' && (
            <div className="overflow-x-auto rounded-xl bg-light p-6">
              <p className="text-white">Statistics content goes here…</p>
            </div>
          )}
        </main>
      </div>

      {/* ─── Modals ────────────────────────────────────────────────────────────── */}
      <TransferAmountModal isOpen={isOldModalOpen} onClose={() => setIsOldModalOpen(false)} />

      <AdminTransferModal isOpen={isSimpleModalOpen} onClose={() => setIsSimpleModalOpen(false)} />
    </>
  );
}
