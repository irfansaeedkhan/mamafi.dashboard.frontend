import { CarretDownIcon, CarretUpIcon, DollarCoin, ETHIcon } from '@/assets/svgs';
import { GetTransactionDetailResponse } from '@/lib/auth/get-transaction-details';
import { sliceAccountAddress } from '@/utils/slice-account-address';
import { getStatusDisplay } from '@/utils/status-label';
import { isNextDisabled, isPrevDisabled, slicePage, TABLE_PAGE_SIZE } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import ReinvestInfoIconWithTooltip from '../shared/reinvest-info-icon-tooltip';

const optionsData = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'withdraw',
    label: 'Withdraw',
  },
  {
    value: 'deposit',
    label: 'Deposit',
  },
];

interface Props {
  transactionDetailList: GetTransactionDetailResponse | null | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const TransactionTableMobile: React.FC<Props> = ({
  transactionDetailList,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('all');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const filteredTransactions =
    transactionDetailList &&
    transactionDetailList.filter(transaction => {
      if (selectedValue === 'all') return true;
      return transaction.type.toLowerCase() === selectedValue;
    });
  const pageRows = slicePage(filteredTransactions || [], page, TABLE_PAGE_SIZE);
  const totalPages = Math.ceil((filteredTransactions?.length || 0) / TABLE_PAGE_SIZE);

  return (
    <div className="flex w-full flex-col rounded-xl box-3d">
      {/* <div className="flex h-16 items-center justify-between gap-5 rounded-t-xl border-b border-black-shade-1/[0.12] bg-light px-6 py-4">
        <YearDropdown
          selectedValue={selectedValue}
          options={optionsData}
          placeholder="All"
          onSelect={(year) => handleValueChange(year)}
        />
      </div> */}

      {pageRows.length > 0 ? (
        pageRows.map((transactionItem, index) => {
          const {
            id,
            blockNumber,
            contract,
            createdAt,
            from,
            hash,
            status,
            to,
            type,
            value,
            token,
            updatedAt,
            changed_eth_price_percentage,
            changed_eth_price,
            value_in_eth,
            eth_price,
          } = transactionItem;
          return (
            <div
              key={index}
              className="flex w-full flex-col gap-3 border-b border-light bg-light p-6 last:rounded-b-xl last:border-none"
            >
              <div className={mainDiv}>
                <h6 className={h6}>Type</h6>
                <p className={p}> {type ?? 'N/A'}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Date</h6>
                <p className={p}>{updatedAt ? dayjs(updatedAt).format('DD MMM YYYY') : 'N/A'}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Amount (US$)</h6>
                <span className={`${p} text-right flex justify-center gap-2`}>
                  <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                  <span className="text-right" >
                    {Number(value).toFixed(6) ?? 'N/A'} US$
                  </span>
                </span>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Amount (ETH)</h6>
                <span className={`${p} text-right flex justify-center gap-2`}>
                  <ETHIcon className="size-6 h-6 w-6 shrink-0" />
                  <span className="text-right" >
                    {Number(value_in_eth).toFixed(6) ?? 'N/A'} ETH
                  </span>
                </span>
              </div>
              <div className={mainDiv}>
                <div className="flex items-center gap-1">
                  <h6 className={h6}>ETH price</h6>
                  <ReinvestInfoIconWithTooltip
                  variant="table-header"
                    text="The changes of Ethereum are related to last 24 hours"
                    color="#FFFFFF"
                  />
                </div>
                <div className={p}>
                  <div className="flex flex-col items-end  gap-1 lg:flex-row">
                    <span className="text-xs font-bold text-white">US$ {eth_price ?? 'N/A'}</span>
                    <div className="flex items-center gap-1 text-xxs font-medium">
                      {changed_eth_price_percentage >= 0 ? (
                        <span className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-mint">
                          <CarretUpIcon className="size-4 fill-brand-mint stroke-brand-mint" />{' '}
                          {changed_eth_price_percentage.toFixed(2)  ?? 'N/A'}%
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-red">
                          <CarretDownIcon className="size-4 fill-brand-red stroke-brand-red" />{' '}
                          {changed_eth_price_percentage ?? 'N/A'}%
                        </span>
                      )}

                      <span className="text-sm text-xxs font-medium text-white/50">
                        (~ US$ {changed_eth_price ?? 'N/A'})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>{type === 'DEPOSIT' ? 'From:' : 'To:'}</h6>
                <p className={p}>
                  {type === 'DEPOSIT' ? sliceAccountAddress(from) : sliceAccountAddress(to)}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Hash</h6>
                <p className={p}>{hash ? sliceAccountAddress(hash) : 'N/A'}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Status</h6>
                {(() => {
                  const statusInfo = getStatusDisplay(status);
                  return <span className={statusInfo.className}>{statusInfo.label}</span>;
                })()}
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
          No record found
        </div>
      )}

      {/* {dashboardData?.Number_of_Pages > 0 && (
        <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            <HiMiniArrowLeft /> Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === dashboardData?.Number_of_Pages}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Next <HiMiniArrowRight />
          </button>
        </div>
      )} */}
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

const mainDiv = 'flex w-full items-center justify-between gap-4';
const h6 = 'text-sm font-medium text-white leading-[18px]';
const p = 'text-sm text-white leading-5 flex items-center gap-1';
