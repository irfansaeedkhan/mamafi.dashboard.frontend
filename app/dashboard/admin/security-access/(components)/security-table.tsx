'use client';

import { ActiveAdminIcon, CreateAdminIcon, ManageAdminIcon, SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import Link from 'next/link';
import { useState } from 'react';
import { Column, DataTableNew } from '../../admin_components/data-table';
import CreateAdminModal from './create-admin-modal';
import ViewAdminModal from './view-admin-modal';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  status: 'Active' | 'Suspended';
  lastLogin: string;
}

const dummyAdmins: AdminUser[] = Array.from({ length: 20 }).map((_, i) => ({
  id: '144568',
  username: 'John Doe',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  createdAt: '12 JAN 2024',
  role: [
    'Super Admin',
    'Admin',
    'Editor',
    'Transaction Manager',
    'Asset Manager',
    'Audit and Report Manager',
    'Support Manager',
    'Support Agent',
  ][i % 8],
  status: i % 2 === 0 ? 'Active' : 'Suspended',
  lastLogin: '12 JAN 2024',
}));

const SecurityAccessPage = () => {
  const [search, setSearch] = useState('');
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [isViewAdminModalOpen, setIsViewAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const filtered = dummyAdmins.filter(admin =>
    `${admin.username} ${admin.email} ${admin.id}`.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<AdminUser>[] = [
    { key: 'id', header: 'Admin ID', accessor: 'id' },
    { key: 'username', header: 'Username', accessor: 'username' },
    { key: 'name', header: 'Name and Surname', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'createdAt', header: 'Creation Date', accessor: 'createdAt' },
    { key: 'role', header: 'User Role', accessor: 'role' },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      filterOptions: ['Active', 'Suspended'],
      renderCell: row => {
        return (
          <span className={row.status === 'Active' ? 'text-brand-mint' : 'text-brand-red'}>
            {row.status}
          </span>
        );
      },
    },
    { key: 'lastLogin', header: 'Last Login', accessor: 'lastLogin' },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: row => (
        <div className="flex gap-2">
          <Button
            title="View Admin"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => {
              setSelectedAdmin(row);
              setIsViewAdminModalOpen(true);
            }}
          />
          <Button
            title={row.status === 'Active' ? 'Suspend' : 'Restore'}
            variant={row.status === 'Active' ? 'confirm-danger' : 'confirm'}
            size="sm"
            compact
            className="capitalize"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gradient text-2xl font-bold">Security & Access Control</h1>
        <p className="text-sm text-white">
          Manage platform security by auditing admin actions and controlling user sessions.
        </p>
      </div>

      {/* Top Actions */}
      <div className="--grid hidden grid-cols-3 gap-6">
        <div className="flex items-center justify-between rounded-xl box-3d p-4 text-white">
          <CreateAdminIcon />

          <div className="flex flex-col items-center">
            <p className="text-white mb-2 text-base">Create new Admin</p>
            <Button
              title="Create"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
              onClick={() => setIsCreateAdminModalOpen(true)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl box-3d p-4 text-white">
          <ManageAdminIcon />

          <div className="flex flex-col items-center">
            <p className="text-white mb-2 text-base">Manage Admin</p>
            <Button
              title="Manage"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
            />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl box-3d p-4 text-white">
          <ActiveAdminIcon />

          <div className="flex flex-col items-center">
            <p className="text-white mb-2 text-base">Active Sessions</p>
            <Link href="/dashboard/admin/security-access/active-sessions">
              <Button
                title="Manage"
                variant="confirm"
                size="sm"
                compact
                className="capitalize"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end py-4">
        <div className="relative w-[40%]">
          <input
            type="text"
            placeholder="Search by user email, Admin ID, or username"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark py-3 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white" />
        </div>
      </div>

      {/* Data Table */}
      <DataTableNew columns={columns} data={filtered} pageSize={10} />

      <CreateAdminModal
        isOpen={isCreateAdminModalOpen}
        onClose={() => setIsCreateAdminModalOpen(false)}
      />
      <ViewAdminModal
        isOpen={isViewAdminModalOpen}
        onClose={() => setIsViewAdminModalOpen(false)}
        // admin={selectedAdmin}
      />
    </div>
  );
};

export default SecurityAccessPage;
