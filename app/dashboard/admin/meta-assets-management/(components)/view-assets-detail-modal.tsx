'use client';

import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Column, DataTableNew } from '../../admin_components/data-table';
import { transactions } from './constant';

interface ViewAssetsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
}

const TABS = ['Asset Info', 'Purchase History', 'Transaction History'];

export default function ViewAssetsDetailModal({
  isOpen,
  onClose,
  asset,
}: ViewAssetsDetailModalProps) {
  const [activeTab, setActiveTab] = useState('Asset Info');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('Asset Info');
      setCurrentPage(1);
    }
  }, [isOpen]);

  if (!isOpen || !asset) return null;

  // Dummy data
  const dummyPurchaseData = Array.from({ length: 12 }).map((_, i) => ({
    date: '12 JAN 2024',
    transactionId: 'View Transaction',
    userId: '12175688',
    userName: 'John Doe',
    email: 'johndoe@gmail.com',
    price: '$1,200',
  }));

  const Info = ({
    label,
    value,
    sub,
    statusColor = false,
  }: {
    label: string;
    value: string;
    sub?: string;
    statusColor?: boolean;
  }) => {
    const color = statusColor
      ? value === 'Active'
        ? 'text-brand-mint'
        : value === 'Inactive'
          ? 'text-white'
          : 'text-brand-red'
      : 'text-white';

    return (
      <div>
        <p className="text-xs text-white">{label}</p>
        <p className={`text-sm ${color} flex flex-row gap-5 font-normal`}>
          {value} {sub && <span className=" text-white">{sub}</span>}
        </p>
      </div>
    );
  };

  // Purchase History Table Columns
  const purchaseColumns: Column<any>[] = [
    { key: 'date', header: 'Purchase Date', accessor: 'date' },
    {
      key: 'transactionId',
      header: 'Transaction ID',
      renderCell: () => (
        <Button
          title="View Transaction"
          variant="confirm"
          size="sm"
          compact
          className="capitalize"
        />
      ),
    },
    {
      key: 'buyer',
      header: 'Buyer Information',
      renderCell: () => (
        <Button
          title="View User"
          variant="confirm"
          size="sm"
          compact
          className="capitalize"
        />
      ),
    },
    { key: 'userId', header: 'User ID', accessor: 'userId' },
    { key: 'userName', header: 'User Name', accessor: 'userName' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'price', header: 'Purchase Price', accessor: 'price' },
  ];

  // Transaction History Table Columns
  const txnColumns: Column<any>[] = [
    { key: 'date', header: 'Date of transaction', accessor: 'date' },
    { key: 'id', header: 'Transaction ID', accessor: 'id' },
    { key: 'amount', header: 'Amount', accessor: 'amount' },
    {
      key: 'status',
      header: 'Status',
      renderCell: txn => {
        const cls =
          txn.status === 'Successful'
            ? 'text-brand-mint'
            : txn.status === 'Pending'
              ? 'text-white'
              : 'text-brand-red';
        return <span className={cls}>{txn.status}</span>;
      },
    },
    {
      key: 'actions',
      header: '',
      renderCell: () => (
        <Button
          title="View Transaction"
          variant="confirm"
          size="sm"
          compact
          className="capitalize"
        />
      ),
    },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0EBF] backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-5xl rounded-xl box-3d bg-dark p-6 text-white">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-gradient text-2xl font-bold">Sigillum Details</h2>
          <button onClick={onClose} className="hover:text-gray-300 text-white">
            <CircleX size={24} />
          </button>
        </div>

        {/* Tabs */}
        <ul className="mb-4 flex gap-6 border-b border-[#0E1F30] text-sm font-medium">
          {TABS.map(t => (
            <li
              key={t}
              onClick={() => {
                setActiveTab(t);
                setCurrentPage(1);
              }}
              className={`cursor-pointer pb-2 ${
                activeTab === t ? 'border-b-2 border-[#1c83ff] text-brand-mint' : 'text-white'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Asset Info */}
        {activeTab === 'Asset Info' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 rounded-xl bg-light p-4">
              <Info label="Sigillum ID" value={asset.id} />
              <Info label="Sigillum Name" value={asset.name} />
              <Info label="Sigillum Description" value={asset.description} />
              <div></div>
            </div>
            <div className="grid grid-cols-4 gap-4 rounded-xl bg-light p-4">
              <Info
                label="Status"
                value={asset.status.state}
                sub={asset.status.ownership}
                statusColor
              />
              <Info label="Sigillum Type" value={asset.type} />
              <Info label="Purchase Date" value={asset.purchaseDate} />
              <Info label="Price" value={`$${Number(asset.price).toLocaleString()}`} />
            </div>

            <Button
              title="Edit Sigillum Details"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
            />
          </div>
        )}

        {/* Purchase History */}
        {activeTab === 'Purchase History' && (
          <DataTableNew
            columns={purchaseColumns}
            data={dummyPurchaseData}
            pageSize={5}
            theadBg="bg-light"
            tbodyBg="bg-light"
            footerBg="bg-light"
            hoverBg="hover:bg-dark transition-all duration-300"
          />
        )}

        {/* Transaction History */}
        {activeTab === 'Transaction History' && (
          <DataTableNew
            columns={txnColumns}
            data={transactions.slice(0, 12)}
            pageSize={5}
            theadBg="bg-light"
            tbodyBg="bg-light"
            footerBg="bg-light"
            hoverBg="hover:bg-dark transition-all duration-300"
          />
        )}
      </div>
    </div>
  );
}
