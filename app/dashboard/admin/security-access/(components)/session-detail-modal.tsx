'use client';

import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import React from 'react';

interface Session {
  userId: string;
  username: string;
  sessionStart: string;
  lastActivity: string;
  ipAddress: string;
  duration: string;
  location: string;
}

interface SessionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  const details = [
    'Assets involved',
    'Transaction involved',
    'Reward Involved',
    'Assets involved',
    'Transaction involved',
    'Reward Involved',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl rounded-xl box-3d bg-dark text-white">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-gradient text-2xl font-bold">Session Details</h2>
            <button onClick={onClose} className="text-white">
              <CircleX size={24} />
            </button>
          </div>

          {/* Info Grid */}
          <div className="roundedp-6 mb-6 grid grid-cols-4 gap-6 text-sm">
            <div>
              <p className="mb-1 text-xs text-white">UserID</p>
              <p>{session.userId}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Username</p>
              <p>{session.username}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Session Start Time</p>
              <p>{session.sessionStart}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Last Activity</p>
              <p>{session.lastActivity}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">IP Address</p>
              <p>{session.ipAddress}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Session Duration</p>
              <p>{session.duration}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-white">Location</p>
              <p>{session.location}</p>
            </div>
          </div>

          {/* Session Description */}
          <h4 className="my-3 text-white">Session Details</h4>
          <div className="max-h-48 overflow-y-auto rounded p-4 text-sm scrollbar-thin scrollbar-track-dark scrollbar-thumb-[#287ef6]">
            {details.map((label, idx) => (
              <div key={idx} className="flex justify-between border-b border-[#1F3549] py-2">
                <span>{label}</span>
                <p className="w-2/3 text-right text-xs text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              title="Terminate Session"
              variant="confirm-danger"
              size="sm"
              compact
              className="capitalize"
              onClick={() => alert('Terminating session...')}
            />
            <Button
              title="Export Log"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
              onClick={() => alert('Exporting log...')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsModal;
