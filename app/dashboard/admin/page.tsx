'use client';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { SigillumTableDesktop } from '@/components/admin/meta-assets-management/meta-assets-table-desktop';
import { SigillumTableMobile } from '@/components/admin/meta-assets-management/meta-assets-table-mobile';
import { AddSigillumModal } from '@/components/admin/meta-assets-management/models/add-meta-assets-model';
import { RemoveSigillumModal } from '@/components/admin/meta-assets-management/models/remove-meta-assets-model';
import { Button } from '@/components/shared';
import { AdminAppRoutes } from '@/constants/app-routes';
import {
  getSigillumDetails,
  SigillumDetailsListType,
} from '@/lib/auth/admin/get-meta-assets-details';

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const [openAddSigillumModal, setOpenAddSigillumModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedTotalAssets, setSelectedTotalAssets] = useState(0);
  const [openRemoveSigillumModal, setOpenRemoveSigillumModal] = useState(false);

  const [SigillumDetailList, setSigillumDetailList] = useState<SigillumDetailsListType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 2;

  useEffect(() => {
    getSigillumDetailsDetails();
  }, [page]);

  const handleRemoveSigillumModel = (userId: string, totalAssets: number) => {
    setSelectedUserId(userId);
    setSelectedTotalAssets(totalAssets);
    setOpenRemoveSigillumModal(true);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const getSigillumDetailsDetails = useCallback(async () => {
    try {
      const res = await getSigillumDetails(page, limit);
      setSigillumDetailList(res.data);
      setTotalPages(Math.ceil(res.count / limit));
    } catch (error) {
      console.log(error);
    }
  }, [page, limit]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col gap-5 lg:gap-14">
        {pathname === AdminAppRoutes.dashboard.index && (
          <div className="flex flex-col gap-1  pt-8 sm:pt-0">
            <h4 className="text-gradient font-kanit text-xl font-bold lg:text-2xl">
              Sigillum Management
            </h4>
            <p className="text-sm text-white">
              Manage and track all Sigillum on the platform, including adding and removing Sigillum
              for users.
            </p>
          </div>
        )}
        {pathname === AdminAppRoutes.dashboard.index && (
          <div className="flex w-full flex-col gap-5  sm:flex-row sm:items-center">
            <div className="flex w-full items-center justify-between gap-2 rounded-3xl box-3d p-4 sm:w-2/5">
              <h5 className="text-white font-kanit text-base">Add Sigillum:</h5>
              <Button
                title="Add"
                variant="confirm"
                size="sm"
                compact
                onClick={() => setOpenAddSigillumModal(true)}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-2 rounded-3xl box-3d p-4 sm:w-3/5">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <h5 className="text-white font-kanit text-base">Add Sigillum:</h5>
                <p className="text-xs text-white">Weekly/monthly reports on new purchases</p>
              </div>
              <Button title="View Report" variant="confirm" size="sm" compact />
            </div>
          </div>
        )}
      </div>

      <h4 className="text-gradient pt-16 font-kanit text-xl lg:text-2xl">Sigillum</h4>
      <div className="hidden lg:block">
        <SigillumTableDesktop
          SigillumDetailList={SigillumDetailList}
          handlePrevPage={() => setPage(prev => Math.max(prev - 1, 1))}
          handleNextPage={() => setPage(prev => Math.min(prev + 1, totalPages))}
          page={page}
          handleRemoveSigillumModel={handleRemoveSigillumModel}
        />
      </div>
      <div className="block lg:hidden">
        <SigillumTableMobile
          SigillumDetailList={SigillumDetailList}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleRemoveSigillumModel={handleRemoveSigillumModel}
          page={page}
        />
      </div>

      <AddSigillumModal
        open={openAddSigillumModal}
        onClose={() => setOpenAddSigillumModal(false)}
      />
      <RemoveSigillumModal
        open={openRemoveSigillumModal}
        onClose={() => setOpenRemoveSigillumModal(false)}
        userEmail={selectedUserId}
        totalAssets={selectedTotalAssets}
      />

      <div>
        {loading && (
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
            <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
