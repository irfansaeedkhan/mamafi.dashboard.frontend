'use client';

import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import React from 'react';

interface ViewAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewAdminModal: React.FC<ViewAdminModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Dummy Data
  const admin = {
    actionId: '123889901',
    dateTime: '12 JAN 2024 10:12 am',
    adminId: '144568',
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    actionType: 'User modification',
    status: 'Completed',
  };

  const statusColor =
    admin.status === 'Completed'
      ? 'text-brand-mint'
      : admin.status === 'Failed'
        ? 'text-brand-red'
        : 'text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl rounded-xl box-3d bg-dark text-white">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-gradient text-2xl font-bold">View Details</h2>
            <button onClick={onClose} className="text-white">
              <CircleX size={24} />
            </button>
          </div>

          {/* Info Row */}
          <div className="mb-6 grid grid-cols-4 gap-4  p-6 text-sm">
            <div>
              <p className="mb-1 text-xs text-white">ActionID</p>
              <p>{admin.actionId}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Date and Time</p>
              <p>{admin.dateTime}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Admin ID</p>
              <p>{admin.adminId}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Admin Username</p>
              <p>{admin.username}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Admin Email</p>
              <p>{admin.email}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Action Type</p>
              <p>{admin.actionType}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Status</p>
              <p className={statusColor}>{admin.status}</p>
            </div>
          </div>

          {/* Action Description */}
          <h4 className="mb-3 text-white">Action Description</h4>
          <div className="max-h-48 overflow-y-auto rounded p-4 text-sm scrollbar-thin scrollbar-track-dark scrollbar-thumb-[#287ef6]">
            {[
              'Users involved',
              'Sigillum involved',
              'Wallet involved',
              'Users involved',
              'Sigillum involved',
              'Wallet involved',
            ].map((label, idx) => (
              <div key={idx} className="flex justify-between border-b border-dark/60 py-2">
                <span>{label}</span>
                <p className="w-2/3 text-right text-xs text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-6 flex justify-end">
            <Button
              title="Download Log"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
              onClick={() => alert('Downloading log...')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminModal;
