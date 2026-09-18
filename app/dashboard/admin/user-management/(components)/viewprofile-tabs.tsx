'use client';

import { CalendarIconGradient, GlobalSearch, MapIcon, ShareIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import React from 'react';
import { HiOutlineGlobeAlt, HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi';

import { Column, DataTableNew } from '../../admin_components/data-table';
import { useNumberFormatter } from '../../admin_components/use-number-formatter';

type AssetRow = {
  date: string;
  price: string;
  status: string;
  tx: string;
};

type TxRow = {
  date: string;
  amount: string;
  category: string;
  status: string;
};

type EarningsRow = {
  date: string;
  amount: string;
  category: string;
  status: string;
};

type AffiliateRow = {
  username: string;
  reg: string;
};

type ActivityRow = {
  date: string;
  ip: string;
  session: string;
  info: string;
};
export function PersonalInfoPanel({ user, onAction }: { user: any; onAction: () => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <img src={user.avatarUrl} alt="" className="h-16 w-16 rounded-full" />
          <h3 className="text-base font-normal">{user.name}</h3>
        </div>
        <div className="flex gap-3">
          <Button
            title="Suspend"
            variant="confirm-danger"
            size="sm"
            compact
            className="capitalize"
            onClick={onAction}
          />
          <Button
            title="Unblock"
            variant="confirm-danger"
            size="sm"
            compact
            className="capitalize"
            onClick={onAction}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between p-4 text-sm">
        <InfoItem
          icon={<HiOutlineUser className="size-6 h-6 w-6 shrink-0 text-white" />}
          label="Name"
          value={user.name}
        />
        <InfoItem
          icon={<HiOutlineMail className="size-6 h-6 w-6 shrink-0 text-white" />}
          label="Email"
          value={user.email}
        />
        <InfoItem
          icon={<HiOutlineGlobeAlt className="size-6 h-6 w-6 shrink-0 text-white" />}
          label="Country"
          value={user.country}
        />
        <InfoItem
          icon={<HiOutlinePhone className="size-6 h-6 w-6 shrink-0 text-white" />}
          label="Phone Number"
          value={user.phone}
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="shrink-0 text-white">{icon}</div>
      <div>
        <p className="text-xs text-white">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

// 2️⃣ Registration Info
export function RegistrationInfoPanel({ user }: { user: any }) {
  return (
    <div className=" text-sm">
      <div className="flex items-center justify-between  px-4 py-6">
        {/* Date */}
        <div className="flex items-center gap-4">
          <CalendarIconGradient className="shrink-0" />
          <div>
            <p className="text-xs text-white">Date</p>
            <p>{user.registrationDate}</p>
          </div>
        </div>

        {/* IP */}
        <div className="flex items-center gap-4">
          <GlobalSearch className="shrink-0" />
          <div>
            <p className="text-xs text-white">IP</p>
            <p>{user.ip}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <MapIcon className="shrink-0" />
          <div>
            <p className="text-xs text-white">Location</p>
            <p>{user.country}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-6">
        {/* Referral */}
        <div className="flex items-center gap-4">
          <ShareIcon className="shrink-0" />
          <div>
            <p className="text-xs text-white">Referral Username</p>
            <p>{user.referral}</p>
          </div>
        </div>

        <Button title="View User" variant="confirm" size="sm" compact className="capitalize" />
      </div>
    </div>
  );
}

// 3️⃣ Asset Holding Table

export function SigillumHoldingTable() {
  const format = useNumberFormatter();
  const assetColumns: Column<AssetRow>[] = [
    { key: 'date', header: 'Date', accessor: 'date' },
    { key: 'price', header: 'Price', accessor: 'price' },
    {
      key: 'status',
      header: 'Status',
      renderCell: row => {
        const cls =
          row.status === 'Success' ? 'text-brand-mint' : row.status === 'Pending' ? 'text-white' : 'text-brand-red';
        return <span className={cls}>{row.status}</span>;
      },
    },
    { key: 'tx', header: 'Transaction ref', accessor: 'tx' },
    {
      key: 'actions',
      header: '',
      renderCell: () => (
        <Button title="Manage Sigillum" variant="confirm" size="sm" compact className="capitalize" />
      ),
    },
  ];

  const assetData: AssetRow[] = Array.from({ length: 12 }).map((_, i) => ({
    date: ['12 JAN 2024', '15 FEB 2024', '20 MAR 2024'][i % 3],
    price: `${format((i + 1) * 1800)} USD`,
    status: i % 2 === 0 ? 'Success' : 'Pending',
    tx: `0xABC...${1000 + i}`,
  }));

  return (
    <DataTableNew<AssetRow>
      columns={assetColumns}
      data={assetData}
      pageSize={5}
      theadBg="bg-light"
      tbodyBg="bg-light"
      footerBg="bg-light"
      hoverBg="hover:bg-dark"
    />
  );
}

// 4️⃣ Transaction History Table

export function TransactionHistoryTable() {
  const fmt = useNumberFormatter();
  const cols: Column<TxRow>[] = [
    { key: 'date', header: 'Date', accessor: 'date' },
    {
      key: 'amount',
      header: 'Amount',
      renderCell: row => <>{fmt(parseInt(row.amount))} USD</>,
    },
    { key: 'category', header: 'Category', accessor: 'category' },
    {
      key: 'status',
      header: 'Status',
      renderCell: row => {
        let cls = '';
        if (row.status === 'Completed') cls = 'text-brand-mint';
        else if (row.status === 'Pending') cls = 'text-white/80';
        else cls = 'text-brand-red';
        return <span className={cls}>{row.status}</span>;
      },
    },
    {
      key: 'actions',
      header: '',
      renderCell: () => (
        <Button
          title="Manage transaction"
          variant="confirm"
          size="sm"
          compact
          className="capitalize"
        />
      ),
    },
  ];
  const txData: TxRow[] = Array.from({ length: 15 }).map((_, i) => ({
    date: ['01 JAN 2024', '05 FEB 2024', '10 MAR 2024'][i % 3],
    amount: String((i + 2) * 500), // raw number
    category: ['Deposit', 'Withdrawal', 'Purchase'][i % 3],
    status: ['Completed', 'Pending', 'Rejected'][i % 3],
  }));

  return (
    <DataTableNew<TxRow>
      columns={cols}
      data={txData}
      pageSize={5}
      theadBg="bg-light"
      tbodyBg="bg-light"
      footerBg="bg-light"
      hoverBg="hover:bg-dark"
    />
  );
}

// 5️⃣ Earnings History Table
export function EarningsHistoryTable() {
  const fmt = useNumberFormatter();
  const cols: Column<EarningsRow>[] = [
    { key: 'date', header: 'Date', accessor: 'date' },
    {
      key: 'amount',
      header: 'Amount',
      renderCell: row => <>{fmt(parseInt(row.amount))} USD</>,
    },
    { key: 'category', header: 'Category', accessor: 'category' },
    {
      key: 'status',
      header: 'Status',
      renderCell: row => {
        let cls = '';
        if (row.status === 'Paid') cls = 'text-brand-mint';
        else if (row.status === 'Assigned') cls = 'text-white';
        else cls = 'text-brand-red';
        return <span className={cls}>{row.status}</span>;
      },
    },
  ];
  const data: EarningsRow[] = Array.from({ length: 8 }).map((_, i) => ({
    date: ['02 JAN 2024', '07 FEB 2024'][i % 2],
    amount: String(1000 + i * 250),
    category: i % 2 === 0 ? 'Affiliate' : 'Assets',
    status: ['Paid', 'Assigned', 'Deleted'][i % 3],
  }));

  return (
    <DataTableNew<EarningsRow>
      columns={cols}
      data={data}
      pageSize={4}
      theadBg="bg-light"
      tbodyBg="bg-light"
      footerBg="bg-light"
      hoverBg="hover:bg-dark"
    />
  );
}

// 6️⃣ Affiliates Table
export function AffiliatesTable() {
  const cols: Column<AffiliateRow>[] = [
    { key: 'username', header: 'Username', accessor: 'username' },
    { key: 'reg', header: 'Registration Date', accessor: 'reg' },
    {
      key: 'actions',
      header: '',
      renderCell: () => (
        <Button title="View User" variant="confirm" size="sm" compact className="capitalize" />
      ),
    },
  ];
  const data: AffiliateRow[] = Array.from({ length: 6 }).map((_, i) => ({
    username: `affiliate${i + 1}`,
    reg: ['10 JAN 2024', '20 FEB 2024'][i % 2],
  }));

  return (
    <DataTableNew<AffiliateRow>
      columns={cols}
      data={data}
      pageSize={3}
      theadBg="bg-light"
      tbodyBg="bg-light"
      footerBg="bg-light"
      hoverBg="hover:bg-dark"
    />
  );
}

export function ActivityTable() {
  const cols: Column<ActivityRow>[] = [
    { key: 'date', header: 'Date', accessor: 'date' },
    { key: 'ip', header: 'IP', accessor: 'ip' },
    { key: 'session', header: 'Session Duration', accessor: 'session' },
    { key: 'info', header: 'More Info', accessor: 'info' },
  ];
  const data: ActivityRow[] = Array.from({ length: 7 }).map((_, i) => ({
    date: ['16 FEB 2024', '18 MAR 2024'][i % 2],
    ip: `128.1.123.${90 + i}`,
    session: `0${i + 1}:1${i}`,
    info: 'Lorem ipsum dolor sit…',
  }));

  return (
    <DataTableNew<ActivityRow>
      columns={cols}
      data={data}
      pageSize={5}
      theadBg="bg-light"
      tbodyBg="bg-light"
      footerBg="bg-light"
      hoverBg="hover:bg-dark"
    />
  );
}

export function KycPanel({ user }: { user: any }) {
  return (
    <div className="flex gap-6 text-sm ">
      <div className="flex max-w-fit flex-col justify-between px-4 py-6">
        <InfoItem icon={<CalendarIconGradient />} label="Request Date" value={user.registrationDate} />
        <div className="flex gap-4">
          <Button title="Approve" variant="confirm" size="sm" compact className="capitalize" />
          <Button title="Reject" variant="confirm-danger" size="sm" compact className="capitalize" />
        </div>
      </div>
      <div className="w-full space-y-2  p-6">
        <p className="text-gray-400 text-xs">Documents Uploaded</p>
        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-28 gap-3 overflow-x-auto rounded-xl p-2 text-xs scrollbar-thin scrollbar-track-dark scrollbar-thumb-light">
          {Array.from({ length: 4 }).map((_, i) => (
            <img key={i} src="/images/doc.png" alt="doc-thumb" className="h-20 rounded-lg shadow" />
          ))}
        </div>
      </div>
    </div>
  );
}
