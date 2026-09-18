import { DollarCoin } from '@/assets/svgs';
import { GetRewardListItemResponse } from '@/lib/auth/get-rewards-list';
import { isNextDisabled, isPrevDisabled, slicePage, TABLE_PAGE_SIZE } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React from 'react';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';

interface Props {
  rewardListData: GetRewardListItemResponse;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const RewardListTableMobile: React.FC<Props> = ({
  rewardListData,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  const pageRows = slicePage(rewardListData || [], page, TABLE_PAGE_SIZE);
  const totalPages = Math.ceil((rewardListData?.length || 0) / TABLE_PAGE_SIZE);

  return (
    <div
      className="flex h-full max-h-[80vh] w-full flex-col overflow-y-auto rounded-xl bg-primary"
      style={{ scrollBehavior: 'smooth' }}
    >
      {pageRows.length > 0 ? (
        pageRows.map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 border-b border-light bg-primary p-6 last:rounded-b-xl last:border-none"
          >
            <div className={mainDiv}>
              <h6 className={h6}>Date</h6>
              <p className={p}>{item?.date ? dayjs(item?.date).format('DD MMM YYYY') : 'N/A'}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Amount</h6>
              <p className={p}>
                <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                {item?.amount ? item.amount : 'N/A'} US$
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Type</h6>
              <p className={p}>{item?.type ? item.type : 'N/A'}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>From</h6>
              <p className={p}> {item?.from ? item.from : 'N/A'}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-20 text-center font-kanit font-medium text-white">
          No record found
        </div>
      )}

      {totalPages > 0 && (
        <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
          <button
            onClick={handlePrevPage}
            disabled={isPrevDisabled(page)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            <HiMiniArrowLeft /> Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={isNextDisabled(page, totalPages)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Next <HiMiniArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

const mainDiv = 'flex w-full items-center justify-between gap-5';
const h6 = 'text-sm font-medium text-white opacity-60 leading-[18px]';
const p = 'text-sm text-white leading-5 flex items-center gap-1';
