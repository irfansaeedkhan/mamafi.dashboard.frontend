'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { useMemo, useState } from 'react';
import { Column, DataTableNew } from '../../admin_components/data-table';
import AddSigillumModal from './add-meta-assets-modal';
import ViewAssetsDetailModal from './view-assets-detail-modal';

export type Sigillum = {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: string;
  purchaseDate: string;
  status: {
    state: 'Active' | 'Inactive' | 'Suspended';
    ownership: 'Sold' | 'Free';
  };
  statusState: 'Active' | 'Inactive' | 'Suspended';
  price: number;
  lastTransaction: string;
};

export default function Sigillum() {
  const [filterText, setFilterText] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Sigillum | null>(null);

  const allAssets: Sigillum[] = useMemo(() => {
    const types = ['Type 1', 'Type 2', 'Type 3', 'Top Sigillum'];
    const ownerships: Sigillum['status']['ownership'][] = ['Sold', 'Free'];
    const states: Sigillum['status']['state'][] = ['Active', 'Inactive', 'Suspended'];

    return Array.from({ length: 25 }).map((_, i) => {
      const chosenState = states[i % states.length];
      return {
        id: '0' + String(23889 + (i % 10)),
        userId: '1217568' + String((i % 10) + 1),
        name: 'Lorem Ipsum',
        description: 'Lorem ipsum dolor sit...',
        type: types[i % types.length],
        purchaseDate: ['12 JAN 2024', '15 FEB 2024', '20 MAR 2024'][i % 3],
        status: {
          state: chosenState,
          ownership: ownerships[i % ownerships.length],
        },
        statusState: chosenState,
        price: 1200 + (i % 5) * 100,
        lastTransaction: ['12 JAN 2024', '15 FEB 2024', '20 MAR 2024'][i % 3],
      };
    });
  }, []);

  const filteredAssets = useMemo(() => {
    const tokens = filterText.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return allAssets;

    return allAssets.filter(asset => {
      const haystack = `${asset.id} ${asset.name}`.toLowerCase().trim();
      return tokens.every(tok => haystack.includes(tok));
    });
  }, [filterText, allAssets]);

  const columns: Column<Sigillum>[] = [
    { key: 'id', header: 'Sigillum ID', accessor: 'id' },
    { key: 'userId', header: 'User ID Associated', accessor: 'userId' },
    { key: 'name', header: 'Sigillum Name', accessor: 'name' },
    { key: 'description', header: 'Sigillum Description', accessor: 'description' },
    { key: 'type', header: 'Type', accessor: 'type' },
    {
      key: 'purchaseDate',
      header: 'Purchase Date',
      accessor: 'purchaseDate',
      sortable: true,
    },
    {
      key: 'statusState',
      header: 'Status',
      accessor: 'statusState',
      filterOptions: ['Active', 'Inactive', 'Suspended'],
      renderCell: row => {
        const stateColor =
          row.status.state === 'Active'
            ? 'text-brand-mint'
            : row.status.state === 'Inactive'
              ? 'text-white'
              : 'text-brand-red';
        return (
          <div className="flex flex-col">
            <span className={stateColor}>{row.status.state}</span>
            <span className="text-white">{row.status.ownership}</span>
          </div>
        );
      },
    },
    {
      key: 'price',
      header: 'Price',
      accessor: 'price',
      sortable: true,
      renderCell: row => <span>${row.price.toLocaleString()}</span>,
    },
    {
      key: 'lastTransaction',
      header: 'Last Transaction',
      accessor: 'lastTransaction',
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: row => (
        <div className="flex items-center gap-2">
          <Button
            title="View Sigillum"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => {
              setSelectedAsset(row);
              setIsDetailModalOpen(true);
            }}
          />
          {row.status.state === 'Active' ? (
            <Button
              title="Suspend"
              variant="confirm-danger"
              size="sm"
              compact
              className="capitalize"
              onClick={() => {
                alert(`Suspend Asset ID: ${row.id}`);
              }}
            />
          ) : (
            <Button
              title="Activate"
              variant="confirm-secondary"
              size="sm"
              compact
              className="capitalize"
              onClick={() => {
                alert(`Activate Asset ID: ${row.id}`);
              }}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-gradient text-2xl font-bold">Sigillum Management</h1>
          <p className="text-sm text-white">
            Manage and track all Sigillum on the platform, including adding and removing Sigillum
            for users.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div className="flex w-[40%] items-center justify-between rounded-[20px] box-3d [--gb-bg:#0B1314] px-4 py-3">
            <span className="text-white text-base">Add Sigillum:</span>
            <Button
              variant="confirm"
              title="Add"
              size="lg"
              compact
              className="capitalize"
              onClick={openAddModal}
            />
          </div>
          <div className="flex w-[60%] items-center justify-between rounded-[20px] box-3d [--gb-bg:#0B1314] px-4 py-3">
            <div className="flex flex-row items-center gap-2">
              <span className="text-white text-base">Track Asset Growth:</span>
              <span className="truncate text-xs text-white">
                Weekly/monthly reports on new purchases
              </span>
            </div>
            <Button
              variant="confirm"
              title="View Report"
              size="lg"
              compact
              className="capitalize"
            />
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-between pt-8">
        <h2 className="text-gradient text-2xl font-bold">Sigillum</h2>
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search by Asset ID or Asset Name…"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-white" />
        </div>
      </div>

      <DataTableNew<Sigillum> columns={columns} data={filteredAssets} pageSize={8} />

      <ViewAssetsDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        asset={selectedAsset!}
      />

      <AddSigillumModal isOpen={isAddModalOpen} onClose={closeAddModal} />
    </div>
  );
}
