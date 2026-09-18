'use client';

import { Button } from '@/components/shared';
import { useState } from 'react';
import CustomCheckbox from './custom-checkbox';

const GenerateReport = () => {
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
  const [exportFormats, setExportFormats] = useState<string[]>(['CSV']);
  const [walletFilters, setWalletFilters] = useState<string[]>(['Main']);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left Panel - Notification Settings */}
        <div className="flex-1 rounded-xl box-3d bg-dark py-5">
          <h5 className="text-white mb-2 px-5 text-start font-bold">Personalize Report</h5>
          <div className="flex items-center gap-2 border-t border-dark px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="bg-green h-2 w-2 rounded-sm" />
              <span className="text-sm text-white">List of Active User</span>
            </div>
          </div>

          <table className="w-full text-sm text-white">
            <tbody className="flex flex-col justify-between">
              {notifications.map((notif, idx) => (
                <tr key={idx} className="flex items-center border-t border-dark px-6 py-2">
                  {/* Left Label */}
                  <td className="flex w-1/3 items-center gap-2 text-xs">
                    <div className="bg-green h-2 w-2 rounded-full" />
                    {notif}
                  </td>

                  {/* Current Status */}
                  <td className="flex w-1/6 items-center justify-center gap-2 text-xs font-semibold text-brand-mint">
                    {selectedFreq[notif] ? (
                      <>
                        <div className="bg-green h-2 w-2 rounded-sm" />
                        <p>{selectedFreq[notif]}</p>
                      </>
                    ) : (
                      <p className="text-gray-400">--</p>
                    )}
                  </td>

                  {/* Frequency Options */}
                  {frequencies.map(freq => (
                    <td key={freq} className="w-1/6 px-2 py-2 text-xs">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFreq[notif] === freq}
                          onChange={() => handleCheckboxChange(notif, freq)}
                          className="
                            form-checkbox border-green checked:border-green checked:bg-green 
                            h-[14px] w-[14px] 
                            rounded-sm bg-[#05121E] 
                            text-brand-mint focus:outline-none focus:ring-0
                          "
                        />
                        <span>{freq}</span>
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel */}
        <div className="w-full rounded-xl box-3d bg-dark text-white lg:w-[350px]">
          <div className="border-b border-dark p-4">
            <label className="mb-2 block text-sm">Specific User Reports</label>
            <input
              type="text"
              placeholder="Define username/UserID"
              className="w-full rounded-lg border border-[#1A2638] bg-light px-4 py-2 text-white placeholder-gradient focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
            />
          </div>

          <div className="border-b border-dark p-4">
            <label className="mb-2 block text-sm">Specific Asset Reports</label>
            <input
              type="text"
              placeholder="Define Asset Name"
              className="w-full rounded-lg border border-[#1A2638] bg-light px-4 py-2 text-white placeholder-gradient focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
            />
          </div>

          <div className="p-4">
            <h1 className="mb-2 block text-sm">Specific Reward Report</h1>
            <div className="mb-4 flex items-center gap-3">
              <h3 className="text-sm">Define Reward Period</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="MM"
                  className="w-16 rounded-md border border-[#1A2638] bg-light px-2 py-2 text-center text-white placeholder-gradient"
                />
                <input
                  type="text"
                  placeholder="YYYY"
                  className="w-20 rounded-md border border-[#1A2638] bg-light px-2 py-2 text-center text-white placeholder-gradient"
                />
              </div>
            </div>

            <div className="flex gap-12">
              {' '}
              <label className="mb-1 block text-sm">Reward Type</label>
              <div className="space-y-2">
                {['Affiliate', 'Meta-Asset Earnings'].map(label => (
                  <label key={label} className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      className="form-checkbox border-green checked:bg-green h-[14px] w-[14px] bg-[#05121E] text-brand-mint"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4">
            <label className="mb-2 block text-sm">Specific Wallet Report</label>
            <div className="flex gap-12">
              <label className="mb-1 block text-sm">Define Wallet </label>
              <CustomCheckbox
                options={['Main', 'Rewards', 'Commissions', 'Income']}
                selected={walletFilters}
                onChange={setWalletFilters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className=" flex w-full items-center justify-between rounded-xl box-3d bg-dark p-4 text-white">
        <div className="flex items-center gap-10">
          <label htmlFor="">Export reports in</label>
          <CustomCheckbox
            options={['CSV', 'PDF', 'Excel']}
            selected={exportFormats}
            onChange={setExportFormats}
            direction="row"
          />
        </div>
        <Button
          title="Generate Report"
          variant="confirm"
          size="lg"
          compact
          className="capitalize"
        />
      </div>
    </>
  );
};

export default GenerateReport;
