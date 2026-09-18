import { Column, DataTableNew } from '@/app/dashboard/admin/admin_components/data-table'; // Import DataTableNew and Column
import { DollarCoin } from '@/assets/svgs';
import { GetRewardListItemResponse } from '@/lib/auth/get-rewards-list';
import { TABLE_PAGE_SIZE } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  rewardListData: GetRewardListItemResponse;
  page: number;
  // setPage : React.Dispatch<React.SetStateAction<number>>;
}

export const RewardListTable: React.FC<Props> = ({ rewardListData }) => {
  // Define columns for DataTableNew
  const columns: Column<GetRewardListItemResponse[number]>[] = [
    {
      key: 'date',
      header: 'Date',
      accessor: 'date',
      renderCell: row => (row.date ? dayjs(row.date).format('DD MMM YYYY') : 'N/A'),
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      renderCell: row => (
        <span className="flex items-center gap-1">
          <DollarCoin className="size-6 h-6 w-6 shrink-0" />
          <span className="opacity-60">{row.amount ? row.amount : 'N/A'} US$</span>
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      accessor: 'type',
      renderCell: row => row.type ?? 'N/A',
    },
    {
      key: 'from',
      header: 'From',
      accessor: 'from',
      renderCell: row => row.from ?? 'N/A',
    },
  ];

  return (
    <div className="px-2">
      <div className="flex w-full flex-col rounded-xl">
        <div className="max-w-full overflow-x-auto">
          <DataTableNew
            columns={columns}
            data={rewardListData}
            pageSize={TABLE_PAGE_SIZE}
            theadBg="bg-dark"
            tbodyBg="bg-light"
            footerBg="bg-dark"
            hoverBg="hover:bg-[#0b13147d]"
            wrapperClassName="box-3d"
          />
        </div>
      </div>
    </div>
  );
};
