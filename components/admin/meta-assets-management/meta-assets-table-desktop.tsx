import { Button } from '@/components/shared';
import { SigillumDetailsListType } from '@/lib/auth/admin/get-meta-assets-details';
import React from 'react';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';

interface Props {
  SigillumDetailList: SigillumDetailsListType[] | null | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleRemoveSigillumModel: (userId: string, totalAssets: number) => void;
  page: number;
}

export const SigillumTableDesktop: React.FC<Props> = ({
  SigillumDetailList,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-light text-white">
      <div className="max-w-full overflow-x-auto rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-dark">
            <tr className="text-center">
              <th className="px-6 py-4 text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-sm font-semibold">Weekly ROI</th>
              <th className="px-6 py-4 text-sm font-semibold">Referrer ROI</th>
              <th className="px-6 py-4 text-sm font-semibold">Owned Sigillum</th>
              <th className="px-6 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SigillumDetailList && SigillumDetailList.length > 0 ? (
              SigillumDetailList.map((item: any) => (
                <tr key={item.id} className="border-b border-[#0E1F30] bg-light text-center">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.weekly_roi}</td>
                  <td className="px-6 py-4">{item.referrer_roi}</td>
                  <td className="px-6 py-4">{item.owned_offices}</td>
                  <td className="flex justify-center gap-3 px-6 py-4">
                    <Button title="Manage Assets" variant="confirm" size="sm" compact />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-2 p-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="border-gray-700 flex w-[8rem] items-center justify-center gap-2 rounded-xl border bg-[#142637] px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          <HiMiniArrowLeft /> Previous
        </button>
        <button
          onClick={handleNextPage}
          className="border-gray-700 flex w-[8rem] items-center justify-center gap-2 rounded-xl border bg-[#142637] px-4 py-2 text-sm text-white"
        >
          Next <HiMiniArrowRight />
        </button>
      </div>
    </div>
  );
};
