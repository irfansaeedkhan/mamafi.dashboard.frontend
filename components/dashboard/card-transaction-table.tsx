import { Column, DataTableNew } from '@/app/dashboard/admin/admin_components/data-table';
import { DollarCoin } from '@/assets/svgs';
import { GetCardTransactionDetailResponse } from '@/lib/auth/get-card-transaction-details';
import { sliceAccountAddress } from '@/utils/slice-account-address';
import { TABLE_PAGE_SIZE } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  cardTransactionDetailList: GetCardTransactionDetailResponse | null | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CardTransactionTable: React.FC<Props> = ({ cardTransactionDetailList }) => {
  if (!cardTransactionDetailList) {
    return <div className="w-full p-20 text-center text-white">No record found</div>;
  }

  // Define columns for DataTableNew
  const columns: Column<GetCardTransactionDetailResponse[number]>[] = [
    {
      key: 'brand',
      header: 'Bank Circuit',
      accessor: 'brand',
    },
    {
      key: 'timestamp',
      header: 'Date',
      accessor: 'timestamp',
      renderCell: row => dayjs(row.timestamp * 1000).format('DD MMM YYYY'), // Convert to milliseconds
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      renderCell: row => (
        <span className="flex items-center gap-1">
          <DollarCoin className="size-6 h-6 w-6 shrink-0" />
          {row.amount ?? 'N/A'}
        </span>
      ),
    },
    {
      key: 'currency',
      header: 'Currency',
      accessor: 'currency',
      renderCell: row => <span>{row.currency ?? 'N/A'}</span>,
    },
    {
      key: 'last4',
      header: 'Last 4 Digits',
      accessor: 'last4',
      renderCell: row => sliceAccountAddress(row.last4) ?? 'N/A',
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto">
      <DataTableNew
        columns={columns}
        data={cardTransactionDetailList || []}
        pageSize={TABLE_PAGE_SIZE}
        theadBg="bg-dark"
        tbodyBg="bg-light"
        footerBg="bg-dark"
        hoverBg="hover:bg-[#0b13147d]"
        wrapperClassName="box-3d"
      />
    </div>
  );
};
