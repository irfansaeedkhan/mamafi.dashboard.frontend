import { Button } from '@/components/shared';
import React from 'react';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';

interface Props {
  SigillumDetailList: any | null | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleRemoveSigillumModel: (userId: string, totalAssets: number) => void;
  page: number;
}

export const SigillumTableMobile: React.FC<Props> = ({
  SigillumDetailList,
  handleNextPage,
  handlePrevPage,
  handleRemoveSigillumModel,
  page,
}) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-light">
      {SigillumDetailList && SigillumDetailList.length > 0 ? (
        SigillumDetailList.map((item: any, index: any) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-b border-light bg-light px-4 py-5 first:rounded-t-xl last:border-none"
          >
            <div className={mainDiv}>
              <h6 className={h6}>Full Name</h6>
              <p className={p}>{item.username || 'N/A'}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Email</h6>
              <p className={p}>{item.email || 'N/A'}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Total Assets</h6>
              <p className={p}>{item.totalAssets || 'N/A'}</p>
            </div>

            <div className={mainDiv}>
              <h6 className={h6}>Status</h6>
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  item.status === 'Active'
                    ? 'bg-gradient-pattern text-white'
                    : 'bg-gradient-pattern-red text-white'
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Actions</h6>
              <div className="flex justify-between gap-3">
                {/* <Button
                  title="View Asset"
                  variant="confirm"
                  className="w-full !py-2"
                /> */}
                <Button
                  title="Manage Assets"
                  variant="confirm"
                  className="w-full !py-2"
                  onClick={() => handleRemoveSigillumModel(item.email, item.totalAssets)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
          No record found
        </div>
      )}

      {/* Pagination */}
      <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px] border-[#1414141F] bg-light px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          <HiMiniArrowLeft /> Previous
        </button>
        <button
          onClick={handleNextPage}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px] border-[#1414141F] bg-light px-4 py-2 text-sm text-white"
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
