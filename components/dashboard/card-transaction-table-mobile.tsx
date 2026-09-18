import React from 'react';
import dayjs from 'dayjs';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import { GetCardTransactionDetailResponse } from '@/lib/auth/get-card-transaction-details';
import { isNextDisabled, isPrevDisabled, slicePage, TABLE_PAGE_SIZE } from '@/utils/table-pagination';

interface Props {
  cardTransactionDetailList: GetCardTransactionDetailResponse | null | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const CardTransactionTableMobile: React.FC<Props> = ({
  cardTransactionDetailList,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  const pageRows = slicePage(cardTransactionDetailList || [], page, TABLE_PAGE_SIZE);
  const totalPages = Math.ceil((cardTransactionDetailList?.length || 0) / TABLE_PAGE_SIZE);

  return (
    <div className="flex w-full flex-col rounded-xl box-3d">
      {pageRows.length > 0 ? (
        pageRows.map((transactionItem, index) => {
          const { amount, currency, brand, last4, timestamp } = transactionItem;
          return (
            <div
              key={index}
              className="flex w-full flex-col gap-3 border-b border-light bg-light p-6 last:rounded-b-xl last:border-none"
            >
              <div className={mainDiv}>
                <h6 className={h6}>Bank Circuit</h6>
                <p className={p}> {brand ?? 'N/A'} </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Date</h6>
                <p className={p}>
                  {timestamp
                    ? dayjs(timestamp * 1000).format('DD MMM YYYY') // Convert to milliseconds
                    : 'N/A'}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Amount</h6>
                <p className={p}>{amount ?? 'N/A'}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Currency</h6>
                <p className={p}>{currency ?? 'N/A'}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>last 4 digits</h6>
                <p className={p}>{last4 ?? 'N/A'}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
          No record found
        </div>
      )}

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
    </div>
  );
};

const mainDiv = 'flex w-full items-center justify-between gap-5';
const h6 = 'text-sm font-medium text-white leading-[18px]';
const p = 'text-sm text-white leading-5 flex items-center gap-1';
