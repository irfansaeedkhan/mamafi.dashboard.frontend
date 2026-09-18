'use client';

import { CalendarIconGradient } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { Column, DataTableNew } from '../../admin_components/data-table';
import SingleCheckbox from '../../platform-monitoring/(components)/single-checkbox';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  status: 'Active' | 'Suspended';
  lastLogin: string;
}

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminToEdit?: AdminUser | null;
}

const dummyAuditLogs = [
  {
    actionId: '123889901',
    dateTime: '12 JAN 2024 10:12 am',
    actionType: 'User Modification',
    status: 'Completed',
  },
  {
    actionId: '123889902',
    dateTime: '12 JAN 2024 10:45 am',
    actionType: 'Transaction Management',
    status: 'Failed',
  },
  {
    actionId: '123889903',
    dateTime: '12 JAN 2024 11:05 am',
    actionType: 'Asset Addition',
    status: 'In Progress',
  },
  {
    actionId: '123889904',
    dateTime: '12 JAN 2024 11:30 am',
    actionType: 'Admin Creation',
    status: 'Completed',
  },
  {
    actionId: '123889905',
    dateTime: '12 JAN 2024 12:00 pm',
    actionType: 'Wallet Operation',
    status: 'Failed',
  },
];

const ALL_PERMISSIONS = [
  'Create new Admin',
  'Monitoring and Analysis',
  'Manage Company Wallets',
  'Manage Users Wallets',
  'Manage Transactions',
  'Manage Assets',
  'Manage Users',
  'Manage Notifications',
  'Manage Reports',
  'Manage Ticket Support',
  'Access Tickets',
];

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({
  isOpen,
  onClose,
  adminToEdit = null,
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  // Form fields (Admin Info tab)
  const [form, setForm] = useState<{
    id: string;
    username: string;
    name: string;
    email: string;
    createdAt: string;
    role: AdminUser['role'];
    status: AdminUser['status'];
    lastLogin: string;
  }>({
    id: '',
    username: '',
    name: '',
    email: '',
    createdAt: '',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '',
  });

  const [roleCheckboxes, setRoleCheckboxes] = useState<Record<string, boolean>>({
    'Super Admin': false,
    Admin: false,
    Editor: false,
    'Transaction Manager': false,
    'Asset Manager': false,
    'Audit and Report Manager': false,
    'Support Manager': false,
    'Support Agent': false,
  });

  const [permissionCheckboxes, setPermissionCheckboxes] = useState<Record<string, boolean>>(
    ALL_PERMISSIONS.reduce(
      (acc, perm) => {
        acc[perm] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const [auditDateFilter, setAuditDateFilter] = useState<'Today' | 'Custom'>('Today');
  const [auditCustomDate, setAuditCustomDate] = useState<string>('');

  // ───────────────────────────────────────────────────────────────────────────
  // Pre-fill form if `adminToEdit` changes
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (adminToEdit) {
      setForm({
        id: adminToEdit.id,
        username: adminToEdit.username,
        name: adminToEdit.name,
        email: adminToEdit.email,
        createdAt: adminToEdit.createdAt,
        role: adminToEdit.role,
        status: adminToEdit.status,
        lastLogin: adminToEdit.lastLogin,
      });
      setRoleCheckboxes(prev => ({
        ...prev,
        [adminToEdit.role]: true,
      }));
    } else {
      // Reset to “new admin” defaults
      const today = new Date();
      const dd = today.getDate().toString().padStart(2, '0');
      const mm = (today.getMonth() + 1).toString().padStart(2, '0');
      const yyyy = today.getFullYear();
      const formatted = `${dd} ${today
        .toLocaleString('default', { month: 'short' })
        .toUpperCase()} ${yyyy}`;

      setForm({
        id: 'Auto-generated',
        username: '',
        name: '',
        email: '',
        createdAt: formatted,
        role: 'Super Admin',
        status: 'Active',
        lastLogin: '',
      });
      setRoleCheckboxes({
        'Super Admin': true,
        Admin: false,
        Editor: false,
        'Transaction Manager': false,
        'Asset Manager': false,
        'Audit and Report Manager': false,
        'Support Manager': false,
        'Support Agent': false,
      });
      setPermissionCheckboxes(
        ALL_PERMISSIONS.reduce(
          (acc, perm) => {
            acc[perm] = true;
            return acc;
          },
          {} as Record<string, boolean>
        )
      );
      setAuditDateFilter('Today');
      setAuditCustomDate('');
    }
    setActiveTab(0);
  }, [adminToEdit, isOpen]);

  const toggleRole = (roleName: string) => {
    setRoleCheckboxes(prev => ({
      ...prev,
      [roleName]: !prev[roleName],
    }));
  };

  const togglePermission = (permName: string) => {
    setPermissionCheckboxes(prev => ({
      ...prev,
      [permName]: !prev[permName],
    }));
  };

  const auditColumns: Column<(typeof dummyAuditLogs)[0]>[] = [
    {
      key: 'actionId',
      header: 'ActionID',
      accessor: 'actionId',
    },
    {
      key: 'dateTime',
      header: 'Date and Time of Action',
      accessor: 'dateTime',
    },
    {
      key: 'actionType',
      header: 'Action Type',
      accessor: 'actionType',
      filterOptions: [
        'User Modification',
        'Transaction Management',
        'Asset Addition',
        'Admin Creation',
        'Wallet Operation',
      ],
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      renderCell: row => {
        let cls = '';
        if (row.status === 'Completed') cls = 'font-normal text-brand-mint';
        else if (row.status === 'Failed') cls = 'font-normal text-brand-red';
        else cls = 'text-white';
        return <span className={cls}>{row.status}</span>;
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: () => (
        <div className="flex items-center gap-2">
          <Button
            title="View Detail"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => {
              /* view detail logic */
              alert('Viewing audit detail…');
            }}
          />
          <Button
            title="Download Log"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => {
              /* download log logic */
              alert('Downloading log…');
            }}
          />
        </div>
      ),
    },
  ];

  const auditData = useMemo(() => dummyAuditLogs, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="relative w-full max-w-5xl rounded-xl box-3d bg-light text-white">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-gradient text-2xl font-bold">
              {adminToEdit ? 'Manage Admin' : 'Create New Admin'}
            </h2>
            <button onClick={onClose} className="text-white">
              <CircleX size={24} />
            </button>
          </div>

          <div className="mb-6 mt-8 flex items-center gap-8 border-b border-[#0E1F30] pb-2">
            {['Admin Info', 'Permissions', 'Audit'].map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveTab(idx as 0 | 1 | 2)}
                className={`border-b-2 border-transparent pb-1 text-xs ${
                  activeTab === idx
                    ? 'border-b-2 !border-brand-mint pb-1 font-normal text-brand-mint'
                    : 'text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div className="space-y-6">
              <div className=" p-6 text-sm">
                <div className="flex items-center justify-between border-b border-[#0E1F30] pb-4">
                  <div className="flex items-center gap-4">
                    <p className="text-white">Admin ID</p>
                    <p className="text-brand-mint">{form.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-white">Creation date</p>
                    <p className="text-brand-mint">{form.createdAt}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-6">
                  <div>
                    <label className="mb-1 block text-white">Username</label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                      placeholder="Enter User Name"
                      className="
                        w-full
                        rounded
                        bg-light
                        p-3
                        text-sm
                        text-white
                        placeholder-gradient
                      "
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-white">Name and Surname</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Enter Full Name"
                      className="
                        w-full
                        rounded
                        bg-light
                        p-3
                        text-sm
                        text-white
                        placeholder-gradient
                      "
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-white">Email</label>
                    <input
                      type="text"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="Enter Email"
                      className="
                        w-full
                        rounded
                        bg-light
                        p-3
                        text-sm
                        text-white
                        placeholder-gradient
                      "
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  title="Restore"
                  variant="confirm"
                  size="lg"
                  compact
                  className="capitalize"
                  onClick={() => {
                    alert('Restore clicked');
                  }}
                />
                <Button
                  title="Suspend"
                  variant="confirm-secondary"
                  size="sm"
                  compact
                  className="capitalize"
                  onClick={() => {
                    alert('Suspend clicked');
                  }}
                />
                <Button
                  title={adminToEdit ? 'Update Admin' : 'Create Admin'}
                  variant="confirm"
                  size="lg"
                  compact
                  className="capitalize"
                  onClick={() => {
                    alert(adminToEdit ? 'Updating Admin…' : 'Creating new Admin…');
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <div className="  p-6 text-sm">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                  {[
                    { label: 'Super Admin', subtitle: 'All Permissions' },
                    {
                      label: 'Admin',
                      subtitle: 'All Permissions except create new Admin',
                    },
                    { label: 'Editor', subtitle: 'Manages Notifications' },
                    {
                      label: 'Transaction Manager',
                      subtitle: 'Manages transactions',
                    },
                    { label: 'Asset Manager', subtitle: 'Manages Assets' },
                    {
                      label: 'Audit and Report Manager',
                      subtitle: 'Manages Reports',
                    },
                    {
                      label: 'Support Manager',
                      subtitle: 'Manage user support',
                    },
                    { label: 'Support Agent', subtitle: '' },
                  ].map(({ label, subtitle }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <SingleCheckbox
                        checked={roleCheckboxes[label]}
                        onChange={() => toggleRole(label)}
                        label={label}
                      />
                      {subtitle && <p className="text-[10px] text-white">{subtitle}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className=" text-white">All Permissions</h3>

                <div className="py-6  text-sm">
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {ALL_PERMISSIONS.map(perm => (
                      <div key={perm} className="inline-flex items-center gap-2">
                        <span
                          className={`h-3 w-3 shrink-0 ${
                            permissionCheckboxes[perm] ? 'bg-green' : 'bg-red'
                          }`}
                        />
                        <span className="text-white">{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  title="Confirm Permission"
                  variant="confirm"
                  size="lg"
                  compact
                  className="capitalize"
                  onClick={() => {
                    /* confirm permission logic */
                    alert('Permissions saved');
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-6">
              <div className="--flex hidden items-center justify-end gap-4">
                <div className="relative">
                  <button
                    onClick={() =>
                      setAuditDateFilter(prev => (prev === 'Today' ? 'Custom' : 'Today'))
                    }
                    className="
                      flex items-center gap-2 rounded bg-light px-4 py-2
                      text-xs text-white focus:outline-none
                    "
                  >
                    <span>{auditDateFilter}</span>
                    <IoMdArrowDropdownCircle className="h-4 w-4 text-white" />
                  </button>
                  {auditDateFilter === 'Custom' && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-10 w-full rounded bg-light shadow-lg">
                      <div className="p-2 text-sm text-white">(Calendar placeholder)</div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      alert('Open date picker');
                    }}
                    className="
                      flex items-center gap-2 rounded bg-light px-4 py-2
                      text-xs text-white focus:outline-none
                    "
                  >
                    <span>Date</span>
                    <CalendarIconGradient className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>

              <DataTableNew
                columns={auditColumns}
                data={auditData}
                pageSize={5}
                theadBg="bg-light"
                tbodyBg="bg-light"
                footerBg="bg-light"
                hoverBg="hover:bg-light transition-all duration-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAdminModal;
