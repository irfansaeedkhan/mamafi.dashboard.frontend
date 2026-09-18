'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { Column, DataTableNew } from '../../../admin_components/data-table';

const dummyUsers = Array.from({ length: 10 }).map((_, i) => ({
  userId: '12175688',
  username: 'John Doe',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  regDate: '12 JAN 2024',
  status: ['Active', 'Inactive', 'Suspended'][i % 3],
  reward: 1200,
  wallet: 1200,
}));

const ViewRewardModal = ({ isOpen, onClose, eventData }: any) => {
  const [filter, setFilter] = useState('');

  const filtered = dummyUsers.filter(u =>
    `${u.username} ${u.email} ${u.userId}`.toLowerCase().includes(filter.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      key: 'select',
      header: '',
      renderCell: () => <input type="checkbox" className="accent-blue-500" />,
    },
    { key: 'userId', header: 'User ID', accessor: 'userId' },
    { key: 'username', header: 'Username', accessor: 'username' },
    { key: 'name', header: 'Name and Surname', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'regDate', header: 'Registration Date', accessor: 'regDate' },
    {
      key: 'status',
      header: 'Status',
      renderCell: row => {
        const color =
          row.status === 'Active'
            ? 'text-brand-mint'
            : row.status === 'Inactive'
              ? 'text-white'
              : 'text-brand-red';
        return <span className={color}>{row.status}</span>;
      },
    },
    {
      key: 'reward',
      header: 'Reward Amount',
      renderCell: row => `$${row.reward.toLocaleString()}`,
    },
    {
      key: 'wallet',
      header: 'Wallet Balance',
      renderCell: row => `$${row.wallet.toLocaleString()}`,
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: () => (
        <div className="flex flex-col gap-2">
          <Button
            title="View Profile"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
          />
          <Button title="Exclude" variant="confirm-danger" size="sm" compact className="capitalize" />
          <Button
            title="Recover Reward"  
            variant="confirm-secondary"
            size="sm"
            compact
            className="capitalize"
          />
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-6xl rounded-xl box-3d bg-dark p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-gradient text-2xl font-bold">View Reward</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CircleX />
          </button>
        </div>

        {/* Top Info */}
        <div className="mb-6 rounded-lg bg-light p-6 text-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-white">Reward Period</p>
              <p>20/2024</p>
            </div>
            <div>
              <p className="text-white">Date and time</p>
              <p>12 JAN 2024 10:12 am</p>
            </div>
            <div>
              <p className="text-white">Type</p>
              <p>Affiliate</p>
            </div>
            <div>
              <p className="text-white">Status</p>
              <p className="text-white">To Pay Next Cycle</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 pt-6">
            <div>
              <p className="text-white">Total Users involved</p>
              <p>14</p>
            </div>
            <div>
              <p className="text-white">Total Reward Amount</p>
              <p>$1,200</p>
            </div>
          </div>
        </div>

        <div className="mb-2 mt-10 flex items-center justify-between">
          {/* Table Heading */}
          <h3 className="mb-2 text-sm font-semibold">List of Users involved</h3>

          {/* Search */}
          <div className="relative mb-4 ml-auto w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by email, username, userID"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="search-input-modal w-full rounded-full box-3d bg-light px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
            />
            <SearchNormalIcon className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Table */}
        <DataTableNew<any>
          columns={columns}
          data={filtered}
          pageSize={3}
          theadBg="bg-light"
          tbodyBg="bg-light"
          footerBg="bg-light"
          hoverBg="hover:bg-dark"
        />

        {/* Bottom Buttons */}
        <div className="mt-4 flex justify-start gap-4 rounded-lg bg-light p-4">
          <Button
            title="Assign"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
          />
          <Button
            title="Suspend"
            variant="confirm-danger"
            size="sm"
            compact
            className="capitalize"
          />
          <Button
            title="Recover Reward"
            variant="confirm-secondary"
            size="sm"
            compact
            className="capitalize"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewRewardModal;
