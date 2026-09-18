'use client';
import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';

const EventLogModal = ({ isOpen, onClose, eventData }: any) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0EBF] backdrop-blur-sm">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full  max-w-6xl rounded-xl box-3d bg-dark text-white">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-gradient text-2xl">View Event Log</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <CircleX />
            </button>
          </div>

          {/* Event Details Section */}
          <div className="mb-6 rounded-lg bg-light p-6">
            <div className="mb-4 flex gap-14 border-b border-[#0E1F30] p-4  pb-4">
              <div>
                <p className="mb-1 text-sm text-white">Event Date</p>
                <p className="text-sm">{eventData?.eventDate || '12 JAN 2024'}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-white">Event Type</p>
                <p className="text-sm">{eventData?.eventType || 'Login'}</p>
              </div>
              <div className="">
                <p className="mb-1 text-sm text-white">Event Description</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />{' '}
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            <div className="mb-4  flex gap-14 border-b border-[#0E1F30] p-4">
              <div>
                <p className="mb-1 text-sm text-white">IP</p>
                <p className="text-sm">{eventData?.ip || '128.1.123.970'}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-white">Severity Level</p>
                <p
                  className={`text-sm ${
                    eventData?.severityLevel === 'Normal'
                      ? 'text-brand-mint'
                      : eventData?.severityLevel === 'Warning'
                        ? 'text-white'
                        : eventData?.severityLevel === 'Critical'
                          ? 'text-brand-red'
                          : 'text-brand-mint'
                  }`}
                >
                  {eventData?.severityLevel || 'Normal'}
                </p>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <div>
                <p className="mb-1 text-sm text-white">UserID</p>
                <p className="text-sm">{eventData?.userId || '12175688'}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-white">Username</p>
                <p className="text-sm">{eventData?.username || 'John Doe'}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-white">Name and Surname</p>
                <p className="text-sm">{eventData?.nameAndSurname || 'John Doe'}</p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="mb-1 text-sm text-white">Email</p>
                  <p className="text-sm">{eventData?.email || 'johndoe@gmail.com'}</p>
                </div>
                <div>
                  <Button
                    title=" View User"
                    variant="confirm"
                    size="sm"
                    compact
                    className="capitalize"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Log Activity Section */}
          <div className="mb-6 rounded-lg bg-light p-4 text-sm">
            <h3 className="mb-4 text-base font-semibold">Log Activity</h3>
            <div className="max-h-40 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-dark scrollbar-thumb-[#287ef6]">
              {[
                'Logins / IP',
                'Purchases and Involved Assets',
                'Transactions',
                'Logins / IP',
                'Purchases and Involved Assets',
                'Transactions',
                'Logins / IP',
                'Purchases and Involved Assets',
                'Transactions',
              ].map(label => (
                <div key={label} className="flex border-b border-dark pb-2">
                  <div className="w-1/4 font-medium">{label}</div>
                  <div className="w-3/4 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <Button
              title="  Flag Event"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
              onClick={() => onClose()}
            />
            <Button
              title="Export Detailed Report"
              variant="confirm"
              size="sm"
              compact
              className="capitalize"
              onClick={() => onClose()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLogModal;
