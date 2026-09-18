'use client';

import { AlertTransactionIcon, SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Column, DataTableNew } from '../../admin_components/data-table';
import NotificationModal from './notification-modal';

type Notification = {
  id: string;
  date: string; // ISO
  title: string;
  text: string;
  type: string;
  targetUsers: string;
  targetType: string;
  status: 'Active' | 'Inactive' | 'Scheduled';
  urgency: 'Normal' | 'Important' | 'Urgent';
  readBy: number;
};

export default function NotificationsTable() {
  const [searchText, setSearchText] = useState('');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const allData: Notification[] = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: String(12997650 + i),
        date: dayjs().subtract(i, 'day').toISOString(),
        title: ['System Update', 'News & Updates', 'Assets Info', 'Rewards'][i % 4],
        text: 'Lorem ips…',
        type: ['System and Platform Updates', 'News & Updates', 'Assets Info', 'Rewards'][i % 4],
        targetUsers: ['All users', 'KYC pending users', 'Assets holders', 'User Profile'][i % 4],
        targetType: ['All', 'KYC', 'Assets', 'Promo'][i % 4],
        status: ['Active', 'Inactive', 'Scheduled'][i % 3] as Notification['status'],
        urgency: ['Normal', 'Important', 'Urgent'][i % 3] as Notification['urgency'],
        readBy: Math.floor(Math.random() * 1000),
      })),
    []
  );

  const filtered = useMemo(() => {
    const tokens = searchText.toLowerCase().split(/\s+/).filter(Boolean);
    return allData.filter(row => {
      const hay =
        `${dayjs(row.date).format('DD MMM YYYY')} ${row.type} ${row.targetUsers}`.toLowerCase();
      return tokens.every(t => hay.includes(t));
    });
  }, [allData, searchText]);

  const columns: Column<Notification>[] = [
    {
      key: 'id',
      header: 'Notification ID',
      accessor: 'id',
      sortable: false,
    },
    {
      key: 'date',
      header: 'Notification Date',
      accessor: 'date',
      sortable: true,
      renderCell: r => dayjs(r.date).format('DD MMM YYYY'),
    },
    { key: 'title', header: 'Notification Title', accessor: 'title' },
    {
      key: 'text',
      header: 'Notification Text',
      accessor: 'text',
      renderCell: r => <span className="block max-w-xs truncate">{r.text}</span>,
    },
    {
      key: 'type',
      header: 'Notification Type',
      accessor: 'type',
      filterOptions: ['System and Platform Updates', 'News & Updates', 'Assets Info', 'Rewards'],
    },
    {
      key: 'targetUsers',
      header: 'Target Users',
      accessor: 'targetUsers',
      filterOptions: ['All users', 'KYC pending users', 'Assets holders', 'User Profile'],
    },
    {
      key: 'targetType',
      header: 'Type Target Users',
      accessor: 'targetType',
      sortable: false,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      filterOptions: ['Active', 'Inactive', 'Scheduled'],
      renderCell: r => {
        const cls =
          r.status === 'Active'
            ? 'text-brand-mint'
            : r.status === 'Inactive'
              ? 'text-white'
              : 'text-white';
        return <span className={cls}>{r.status}</span>;
      },
    },
    {
      key: 'urgency',
      header: 'Urgency Level',
      accessor: 'urgency',
      sortable: false,
      renderCell: r => {
        const cls =
          r.urgency === 'Normal'
            ? 'text-white'
            : r.urgency === 'Important'
              ? 'text-brand-mint'
              : 'text-brand-red';
        return <span className={cls}>{r.urgency}</span>;
      },
    },
    {
      key: 'readBy',
      header: 'Read by',
      accessor: 'readBy',
      sortable: false,
      renderCell: r => String(r.readBy),
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: r => (
        <div className="flex items-center gap-2">
          <Button
            title="Edit Notification"
            variant="confirm"
            size="sm"
            compact
            className="min-w-0 capitalize"
            onClick={() => {
              setSelectedNotification(r);
              setIsNotificationModalOpen(true);
            }}
          />
          {r.status === 'Active' ? (
            <Button
              title="Suspend"
              variant="confirm-danger"
              size="sm"
              compact
              className="capitalize"
            />
          ) : (
            <Button
              title="Activate"
              variant="confirm"
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
    <div className="space-y-4">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-gradient text-2xl font-bold">Notifications & Alerts</h1>
          <h6 className="text-sm text-white">
            Set up system-wide alerts and manage user notifications.
          </h6>
        </div>

        <div className="flex w-full items-center">
          <div className="mr-4 rounded-full bg-orange-500/30">
            <AlertTransactionIcon />
          </div>
          <div className="flex-grow">
            <h2 className="mb-1 text-sm text-white">Create A New Notification</h2>
            <Button
              title="Create"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
              onClick={() => {
                setSelectedNotification(null);
                setIsNotificationModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <div className="relative w-[40%]">
          <input
            type="text"
            placeholder="Search by Date, Notification type, Target Users"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark py-3 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white" />
        </div>
      </div>

      <DataTableNew columns={columns} data={filtered} pageSize={8} />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notification={selectedNotification}
      />
    </div>
  );
}
