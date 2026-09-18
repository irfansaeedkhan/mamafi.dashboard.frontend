import { Column, DataTableNew } from '@/app/dashboard/admin/admin_components/data-table';
import { CarretDownIcon, CarretUpIcon, DollarCoin, ETHIcon } from '@/assets/svgs';
import { GetTransactionDetailResponse } from '@/lib/auth/get-transaction-details';
import { sliceAccountAddress } from '@/utils/slice-account-address'; // Import the function
import { getStatusDisplay } from '@/utils/status-label';
import { TABLE_PAGE_SIZE } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React from 'react';
import ReinvestInfoIconWithTooltip from '../shared/reinvest-info-icon-tooltip';

type TransactionRow = GetTransactionDetailResponse[number];

interface Props {
  transactionDetailList: GetTransactionDetailResponse | null | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionTable: React.FC<Props> = ({ transactionDetailList, page, setPage }) => {
  if (!transactionDetailList) {
    return <div className="w-full p-20 text-center text-white">No record found</div>;
  }

  // Define columns for DataTableNew
  const columns: Column<TransactionRow>[] = [
    {
      key: 'type',
      header: 'Type',
      accessor: 'type',
    },
    {
      key: 'updatedAt',
      header: 'Date',
      accessor: 'updatedAt',
      renderCell: row => dayjs(row.updatedAt).format('DD MMM YYYY'),
    },
    {
      key: 'value_usd',
      header: 'Amount (US$)',
      accessor: 'value',
      renderCell: row => (
        <span className="flex items-center gap-1">
          <DollarCoin className="size-6 h-6 w-6 shrink-0" />
          {row.value ?? 'N/A'} US$
        </span>
      ),
    },
    {
      key: 'value_eth',
      header: 'Amount (ETH)',
      accessor: 'value_in_eth',
      renderCell: row => (
        <div className="flex flex-col gap-1 lg:flex-row">
          <span className="flex items-center gap-3">
            <ETHIcon className="size-6 h-6 w-6 shrink-0" />
            {row.value_in_eth ?? 'N/A'} ETH
          </span>
        </div>
      ),
    },
    {
      key: 'eth_price',
      header: (
        <div className="flex items-center justify-center gap-2 relative z-10">
          <span>ETH price</span>
          <ReinvestInfoIconWithTooltip
          variant="table-header"
            text="The changes of Ethereum are related to last 24 hours"
            color="#FFFFFF"
          />
        </div>
      ),
      accessor: 'eth_price',
      renderCell: row => (
        <div className="flex flex-col gap-1 lg:flex-row">
          <span className="flex items-center gap-3">{row.eth_price ?? 'N/A'} ETH</span>
          <div className="flex items-center gap-1 text-xxs font-medium">
            {row.changed_eth_price_percentage >= 0 ? (
              <span className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-mint">
                <CarretUpIcon className="size-4 fill-brand-mint stroke-brand-mint" />
                {row.changed_eth_price_percentage.toFixed(2)}%
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-red">
                <CarretDownIcon className="size-4 fill-brand-red stroke-brand-red" />
                {row.changed_eth_price_percentage}%
              </span>
            )}
            <span className="text-sm text-xxs font-medium text-white/50">
              (~ US$ {row.changed_eth_price})
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'transaction',
      header: 'Transaction',
      accessor: 'from',
      renderCell: row => (
        <>
          <span>{row.type === 'DEPOSIT' ? 'From:' : 'To:'}</span>
          <br />
          <span>
            {row.type === 'DEPOSIT' ? sliceAccountAddress(row.from) : sliceAccountAddress(row.to)}
          </span>
        </>
      ),
    },
    {
      key: 'hash',
      header: 'Hash',
      accessor: 'hash',
      renderCell: row => (row.hash ? sliceAccountAddress(row.hash) : 'N/A'), // Apply sliceAccountAddress
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      renderCell: row => {
        const status = getStatusDisplay(row.status);
        return <span className={status.className}>{status.label}</span>;
      },
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto">
      <DataTableNew<TransactionRow>
        columns={columns}
        data={transactionDetailList || []}
        pageSize={TABLE_PAGE_SIZE}
        theadBg="bg-dark"
        tbodyBg="bg-light"
        footerBg="bg-dark"
        hoverBg="hover:bg-[#0b13147d]"
        wrapperClassName="box-3d"
        externalPagination={{
          currentPage: page,
          totalPages: Math.max(1, Math.ceil((transactionDetailList?.length || 0) / TABLE_PAGE_SIZE)),
          onPageChange: setPage,
        }}
      />
    </div>
  );
};
