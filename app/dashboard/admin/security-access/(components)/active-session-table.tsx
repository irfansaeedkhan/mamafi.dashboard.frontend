'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { useState } from 'react';
import { Column, DataTableNew } from '../../admin_components/data-table';
import SessionDetailsModal from './session-detail-modal';

interface Session {
  userId: string;
  username: string;
  sessionStart: string;
  lastActivity: string;
  ipAddress: string;
  duration: string;
  location: string;
}

const dummySessions: Session[] = Array.from({ length: 10 }).map((_, i) => ({
  userId: '12175688',
  username: 'John Doe',
  sessionStart: '12:02am',
  lastActivity: 'Lorem Ipsum',
  ipAddress: '192.121.56.32',
  duration: '45 mins',
  location: 'Dubai',
}));

const ActiveSessionsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const filtered = dummySessions.filter(s =>
    `${s.userId} ${s.username} ${s.ipAddress}`.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Session>[] = [
    { key: 'username', header: 'Username', accessor: 'username' },
    { key: 'userId', header: 'UserID', accessor: 'userId' },
    {
      key: 'sessionStart',
      header: 'Session Start Time',
      accessor: 'sessionStart',
    },
    { key: 'lastActivity', header: 'Last Activity', accessor: 'lastActivity' },
    { key: 'ipAddress', header: 'IP Address', accessor: 'ipAddress' },
    { key: 'duration', header: 'Session Duration', accessor: 'duration' },
    { key: 'location', header: 'Location', accessor: 'location' },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: row => (
        <div className="flex gap-2">
          <Button
            title="Session Details"
            variant="confirm"
            size="sm"
            compact
            className="capitalize"
            onClick={() => setSelectedSession(row)}
          />
          <Button
            title="Terminate Session"
            variant="confirm-danger"
            size="sm"
            compact
            className="capitalize"
            onClick={() => alert('Terminating session...')}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gradient text-2xl font-bold">Active Sessions</h1>
        <p className="text-sm text-white">
          View all active user sessions, including IP addresses and session duration, with the
          option to terminate any session for security reasons.
        </p>
      </div>

      <div className="flex justify-end">
        <div className="relative w-[40%]">
          <input
            type="text"
            placeholder="Search by username, userID, IP address"
            autoComplete="off"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input w-full rounded-full box-3d bg-dark py-3 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
          />
          <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white" />
        </div>
      </div>

      <DataTableNew<Session>
        columns={columns}
        data={filtered}
        pageSize={10}
        theadBg="bg-dark"
        tbodyBg="bg-light"
        footerBg="bg-light"
        hoverBg="hover:bg-dark transition-all duration-300"
      />

      {selectedSession && (
        <SessionDetailsModal
          isOpen={true}
          onClose={() => setSelectedSession(null)}
          session={selectedSession}
        />
      )}
    </div>
  );
};

export default ActiveSessionsPage;
