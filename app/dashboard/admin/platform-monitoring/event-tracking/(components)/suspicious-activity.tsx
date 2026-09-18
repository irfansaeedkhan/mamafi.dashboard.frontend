'use client';

import { BlueFlagIcon, RedFlagIcon, SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { useMemo, useState } from 'react';
import { Column, DataTableNew } from '../../../admin_components/data-table';
import EventLogModal from './event-log-modal';

type Activity = {
  flag: boolean;
  userId: string;
  username: string;
  nameAndSurname: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventDescription: string;
  severityLevel: 'Normal' | 'Warning' | 'Critical';
  ip: string;
};

export default function SuspiciousActivity() {
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activities: Activity[] = useMemo(
    () => [
      {
        flag: true,
        userId: '12175688',
        username: 'John Doe',
        nameAndSurname: 'John Doe',
        email: 'johndoe@gmail.com',
        eventType: 'Login',
        eventDate: '12 JAN 2024',
        eventDescription: 'Lorem ipsum dolor sit ..',
        severityLevel: 'Normal',
        ip: '128.1.123.970',
      },
      {
        flag: false,
        userId: '12175688',
        username: 'Smith Doe',
        nameAndSurname: 'Smith Doe',
        email: 'johndoe@gmail.com',
        eventType: 'Purchase',
        eventDate: '12 JAN 2024',
        eventDescription: 'Lorem ipsum dolor sit ..',
        severityLevel: 'Warning',
        ip: '128.1.123.971',
      },
      {
        flag: false,
        userId: '12175688',
        username: 'Jane Doe',
        nameAndSurname: 'Jane Doe',
        email: 'johndoe@gmail.com',
        eventType: 'Transaction',
        eventDate: '12 JAN 2024',
        eventDescription: 'Lorem ipsum dolor sit ..',
        severityLevel: 'Critical',
        ip: '128.1.123.972',
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    const q = filterText.toLowerCase().trim();
    if (!q) return activities;
    return activities.filter(
      item =>
        item.email.toLowerCase().includes(q) ||
        item.username.toLowerCase().includes(q) ||
        item.userId.toLowerCase().includes(q)
    );
  }, [filterText, activities]);

  const getSeverityColor = (severity: Activity['severityLevel']) => {
    switch (severity) {
      case 'Normal':
        return 'text-brand-mint';
      case 'Warning':
        return 'text-white';
      case 'Critical':
        return 'text-brand-red';
      default:
        return 'text-white';
    }
  };

  const columns: Column<Activity>[] = [
    {
      key: 'flag',
      header: 'Flag',
      renderCell: row => (
        <div className="flex items-center gap-1">
          {row.flag ? <BlueFlagIcon /> : <RedFlagIcon />}
          <span className={row.flag ? 'text-brand-mint' : 'text-brand-red'}>
            {row.flag ? 'Yes' : 'No'}
          </span>
        </div>
      ),
    },
    { key: 'userId', header: 'User ID', accessor: 'userId' },
    { key: 'username', header: 'Username', accessor: 'username' },
    {
      key: 'nameAndSurname',
      header: 'Name and Surname',
      accessor: 'nameAndSurname',
    },
    { key: 'email', header: 'Email', accessor: 'email' },
    {
      key: 'eventType',
      header: 'Event Type',
      accessor: 'eventType',
      filterOptions: ['Login', 'Purchase', 'Transaction'],
    },
    {
      key: 'eventDate',
      header: 'Event Date',
      accessor: 'eventDate',
      sortable: true,
    },
    {
      key: 'eventDescription',
      header: 'Event Description',
      accessor: 'eventDescription',
    },
    {
      key: 'severityLevel',
      header: 'Severity Level',
      accessor: 'severityLevel',
      renderCell: row => (
        <span className={getSeverityColor(row.severityLevel)}>{row.severityLevel}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: row => (
        <div className="flex gap-2">
          <Button
            title="View Event Log"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => {
              setSelectedActivity(row);
              setIsModalOpen(true);
            }}
          />
          <Button
            title="View User"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
          />
          <Button
            title="Export Detailed Report"
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
        <h2 className="text-2xl font-semibold">Suspicious Activity</h2>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by email, username, user ID"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-gray-800 overflow-hidden rounded-xl">
        <DataTableNew<Activity> columns={columns} data={filteredData} pageSize={5} />
      </div>

      <EventLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventData={selectedActivity || {}}
      />
    </div>
  );
}
