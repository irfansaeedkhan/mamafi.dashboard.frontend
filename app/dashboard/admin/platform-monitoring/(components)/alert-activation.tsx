'use client';

import { useState } from 'react';

const AlertActivation = () => {
  const [selectedFreq, setSelectedFreq] = useState<{ [key: string]: string }>({});

  const notifications = [
    'Failed Transactions',
    'Large Transactions',
    'Significant events/Suspicious Activities',
    'Asset sales',
    'New User registered',
    'New Tickets created',
    'KYC Completed',
    'Deposits Volume',
    'Withdrawal Volumes',
    'Completed transactions',
  ];

  const frequencies = ['Instantly', 'Daily', 'Weekly', 'Monthly'];

  const handleCheckboxChange = (notif: string, freq: string) => {
    setSelectedFreq(prev => ({
      ...prev,
      [notif]: freq,
    }));
  };

  return (
    <div className="overflow-x-auto rounded-xl box-3d py-5">
      <h5 className="text-white mb-2 px-5 text-start text-lg font-bold">
        Personalize Notifications
      </h5>

      {/* Top row with "Low wallet Balance" */}
      <div className="flex items-center justify-start gap-3 border-t border-[#05121E] px-6 py-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-sm bg-gradient-to-r from-[#FF294F] to-[#1C83FF]" />
          <span>Low Wallet Balance</span>
        </div>
      </div>

      {/* Main Table */}
      <table className="w-full text-sm text-white">
        <tbody className="flex flex-col justify-between">
          {notifications.map((notif, idx) => (
            <tr key={idx} className="flex items-center border-t border-[#05121E] px-6 py-2">
              {/* Notification Title */}
              <td className="flex w-1/3 items-center gap-2 text-xs">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#FF294F] to-[#1C83FF]" />
                <span>{notif}</span>
              </td>

              {/* Current Selected Frequency Indicator */}
              <td className="flex w-1/6 items-center justify-center gap-2 text-xs font-semibold text-white">
                {selectedFreq[notif] ? (
                  <>
                    <div className="h-2 w-2 rounded-sm bg-gradient-to-r from-[#FF294F] to-[#1C83FF]" />
                    <p>{selectedFreq[notif]}</p>
                  </>
                ) : (
                  <p className="text-gray-400">--</p>
                )}
              </td>

              {/* Frequency Checkboxes */}
              {frequencies.map(freq => (
                <td key={freq} className="w-1/6 px-2 py-2 text-xs">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFreq[notif] === freq}
                      onChange={() => handleCheckboxChange(notif, freq)}
                      className="
                        form-checkbox h-[14px] w-[14px] rounded-sm 
                        border-[#1C83FF] bg-[#05121E] 
                        text-[#1C83FF] checked:border-[#1C83FF] 
                        checked:bg-[#1C83FF] focus:outline-none focus:ring-0
                      "
                    />
                    <span className="text-xs">{freq}</span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertActivation;
