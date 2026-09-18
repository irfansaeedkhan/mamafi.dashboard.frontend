'use client';

import { DollarCoin } from '@/assets/svgs';
import { TableCell, TableRow } from '@/components/shared';
import TotalNumberField from '@/components/shared/total-number-field';
import { AffiliateStatus, AffiliatesListType } from '@/lib/auth/get-affiliates-list';
import { formatNumber } from '@/utils/format-numbers-dash';
import { getPageCount, isNextDisabled, isPrevDisabled, slicePage } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaCircleUser } from 'react-icons/fa6';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import { YearDropdown } from '../year-drop-down';

interface Props {
  affiliatesList: AffiliatesListType[] | undefined | null;
  isLoading: string;
  selectedFilter: AffiliateStatus;
  onFilterChange: (value: AffiliateStatus | string) => void;
}

const optionsData = [
  { value: 'ALL', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const ReferralTable: React.FC<Props> = ({
  affiliatesList,
  isLoading,
  selectedFilter,
  onFilterChange,
}) => {
  const [page, setPage] = useState(1);
  const totalPages = getPageCount(affiliatesList?.length ?? 0);
  const pageRows = slicePage(affiliatesList, page);

  useEffect(() => {
    setPage(1);
  }, [selectedFilter, affiliatesList?.length]);
  return (
    <div className="flex w-full flex-col rounded-xl box-3d overflow-hidden">
      <div className="flex w-full items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base text-white md:text-xl">Referrals</h2>
          {affiliatesList && <TotalNumberField length={affiliatesList.length} />}
        </div>
        <YearDropdown
          selectedValue={selectedFilter}
          options={optionsData}
          placeholder="All"
          onSelect={onFilterChange}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead className="bg-dark">
            <TableRow
              element="th"
              className="!h-11 w-full bg-dark px-6 py-3 text-xs font-medium capitalize text-white"
            >
              <TableCell element={'th'}>Name</TableCell>
              <TableCell element={'th'}>Sigillum</TableCell>
              <TableCell element={'th'}>Asset Value</TableCell>
              <TableCell element={'th'}>Weekly Commission</TableCell>
              <TableCell element={'th'}>Level</TableCell>
              <TableCell element={'th'}>Position will open on</TableCell>
              <TableCell element={'th'}>Position will close on</TableCell>
            </TableRow>
          </thead>
          {affiliatesList && affiliatesList?.length > 0 && isLoading === 'resolved' && (
            <tbody>
              {pageRows.map((item, i) => {
                return (
                  <TableRow
                    element="tb"
                    key={i}
                    className="w-full overflow-x-auto bg-light px-6 py-4 text-sm  font-semibold text-white last:rounded-b-2xl"
                  >
                    <TableCell
                      element={'td'}
                      className="flex h-[72px] items-center gap-3 last:rounded-br-2xl"
                    >
                      <FaCircleUser className="size-10 shrink-0" />

                      <span className="min-w-max font-semibold">{item.name ?? 'N/A'}</span>
                    </TableCell>

                    <TableCell element={'td'} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                        {item?.meta_assets_owned ?? 'N/A'}
                      </p>
                    </TableCell>
                    <TableCell element={'td'} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                        {item?.asset_value !== undefined &&
                        item?.asset_value !== null &&
                        item?.asset_value !== -1 ? (
                          <span className="flex items-center gap-1">
                            <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                            {formatNumber(item?.asset_value)}
                            &nbsp;US$
                          </span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </p>
                    </TableCell>
                    <TableCell element={'td'} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                        {item?.weekly_comission !== undefined &&
                        item?.weekly_comission !== null &&
                        item?.weekly_comission !== -1 ? (
                          <span className="flex items-center gap-1">
                            <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                            {formatNumber(item?.weekly_comission)}
                            &nbsp;US$
                          </span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </p>
                    </TableCell>
                    <TableCell element={'td'} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                        {item?.level !== undefined && item?.level !== null
                          ? item.level
                          : 'N/A'}
                      </p>
                    </TableCell>
                    <TableCell element={'td'} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                        {item?.open_position_date
                          ? dayjs(item?.open_position_date).format('DD MMM, YYYY')
                          : 'N/A'}
                      </p>
                    </TableCell>
                    <TableCell element={'td'} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                        {item?.close_position_date
                          ? dayjs(item?.close_position_date).format('DD MMM, YYYY')
                          : 'N/A'}
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}
              {totalPages > 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
                      <button
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        disabled={isPrevDisabled(page)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
                      >
                        <HiMiniArrowLeft /> Previous
                      </button>
                      <button
                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={isNextDisabled(page, totalPages)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
                      >
                        Next <HiMiniArrowRight />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
        {affiliatesList?.length === 0 && isLoading === 'resolved' ? (
          <div className="w-full bg-light p-20 text-center font-kanit font-medium text-white">
            You have no affiliates yet
          </div>
        ) : isLoading === 'idle' || isLoading === 'pending' ? (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
            <CgSpinner className="size-14 mx-auto mt-20 animate-spin text-white" />
          </div>
        ) : null}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};
