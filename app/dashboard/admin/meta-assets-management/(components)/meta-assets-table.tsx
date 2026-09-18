'use client';

import { Button } from '@/components/shared';
import { ArrowUpDown, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState } from 'react';
import ViewAssetsDetailModal from './view-assets-detail-modal';

const SigillumTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate dummy assets so that we can paginate (5 per page)
  const assets = Array.from({ length: 12 }).map((_, i) => {
    const types = ['Type 1', 'Type 2', 'Type 3', 'Top Asset'];
    const ownerships = ['Sold', 'Free'];
    return {
      id: '023889',
      userId: '12175688',
      name: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit …',
      type: types[i % types.length],
      purchaseDate: '12 JAN 2024',
      status: {
        state: i % 2 === 0 ? 'Active' : 'Inactive',
        ownership: ownerships[i % ownerships.length],
      },
      price: '$ 1,200',
      lastTransaction: '12 JAN 2024',
      actionStatus: i % 2 === 0 ? 'Suspend' : 'Active',
    };
  });

  const rowsPerPage = 5;
  const totalPages = Math.ceil(assets.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + rowsPerPage);

  const handleViewAsset = (asset: any) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };
  const goToPage = (n: number) => {
    if (n >= 1 && n <= totalPages) setCurrentPage(n);
  };

  // Render either a red “Suspend” or green “Active” button
  const getActionButton = (status: string) => {
    if (status === 'Suspend') {
      return <Button title="Suspend" variant="confirm-danger" size="sm" compact />;
    } else {
      return <Button title="Active" variant="confirm" size="sm" compact className="text-xxs" />;
    }
  };

  return (
    <div className="text-white">
      {/* ─────────── Table ─────────── */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-300 bg-dark">
              <th className="rounded-tl-2xl px-6 py-2 font-medium">Asset ID</th>
              <th className="px-6 py-2 font-medium">UserID Associated</th>
              <th className="px-6 py-2 font-medium">Asset Name</th>
              <th className="px-6 py-2 font-medium">Asset Description</th>
              <th className="px-6 py-2 font-medium">
                <div className="flex items-center">
                  Type
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-6 py-2 font-medium">
                <div className="flex items-center">
                  Purchase Date
                  <ArrowUpDown size={14} className="ml-1 rotate-180" />
                </div>
              </th>
              <th className="px-6 py-2 font-medium">
                <div className="flex items-center">
                  Status
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-6 py-2 font-medium">Price</th>
              <th className="px-6 py-2 font-medium">Last Transaction</th>
              <th className="rounded-tr-2xl px-6 py-2 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-light">
            {paginatedAssets.map((asset, idx) => (
              <tr key={idx} className="border-b border-[#0E1F30]">
                <td className="px-6 py-4">{asset.id}</td>
                <td className="px-6 py-4">{asset.userId}</td>
                <td className="px-6 py-4">{asset.name}</td>
                <td className="px-6 py-4">{asset.description}</td>
                <td className="px-6 py-4">{asset.type}</td>
                <td className="px-6 py-4">{asset.purchaseDate}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span
                      className={
                        asset.status.state === 'Active' ? 'text-brand-mint' : 'text-brand-red'
                      }
                    >
                      {asset.status.state}
                    </span>
                    <span className="text-gray-400">{asset.status.ownership}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{asset.price}</td>
                <td className="px-6 py-4">{asset.lastTransaction}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      title="View Asset"
                      variant="confirm"
                      className="rounded-full text-xxs"
                      onClick={() => handleViewAsset(asset)}
                    />
                    {getActionButton(asset.actionStatus)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─────────── Pagination ─────────── */}
      <div className="flex items-center justify-end gap-2 rounded-bl-2xl rounded-br-2xl bg-light p-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center justify-center rounded-full p-2 text-white hover:text-white disabled:opacity-50"
        >
          <CircleChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`
              mx-1 flex h-8 w-8 items-center justify-center
              rounded-full text-sm
              ${currentPage === i + 1 ? 'border border-[#1c83ff] text-brand-mint' : 'text-gray-300'}
            `}
          >
            {i + 1}
          </button>
        ))}

        <span className="text-gray-400 mx-1">…</span>

        <button
          onClick={() => goToPage(totalPages)}
          className="text-gray-300 mx-1 flex h-8 w-8 items-center justify-center rounded-full text-sm"
        >
          {totalPages}
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center rounded-full p-2 text-white hover:text-white disabled:opacity-50"
        >
          <CircleChevronRight />
        </button>
      </div>

      {/* ─────────── Asset Details Modal ─────────── */}
      <ViewAssetsDetailModal isOpen={isModalOpen} onClose={closeModal} asset={selectedAsset} />
    </div>
  );
};

export default SigillumTable;
