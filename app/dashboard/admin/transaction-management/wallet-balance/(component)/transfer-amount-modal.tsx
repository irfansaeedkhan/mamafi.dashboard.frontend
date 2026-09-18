// components/admin/transaction-management/transfer-amount-modal.tsx
'use client';

import { ArrowSquareDownIcon, MoneyReciveIcon, MoneySendIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import React, { useState } from 'react';

interface TransferAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A simple list of “Admin wallet names” for demonstration.
 * In a real app, you’d pull this from props or context/API.
 */
const WALLET_OPTIONS = ['Company wallets – Main', 'Rewards', 'Commissions', 'Income'];

const TransferAmountModal: React.FC<TransferAmountModalProps> = ({ isOpen, onClose }) => {
  // Which tab is active? "add" or "withdraw"
  const [activeTab, setActiveTab] = useState<'add' | 'withdraw'>('add');

  // Controlled “From” / “To” dropdown state:
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const [selectedFrom, setSelectedFrom] = useState(WALLET_OPTIONS[0]);
  const [selectedTo, setSelectedTo] = useState(WALLET_OPTIONS[0]);

  // Controlled “Amount” text
  const [amountValue, setAmountValue] = useState('');

  // Controlled “Username” text (for the “withdraw” tab when From is username)
  const [usernameValue, setUsernameValue] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />

      {/* Modal container */}
      <div className="relative mx-4 w-full max-w-4xl rounded-xl box-3d bg-dark p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-gradient text-2xl font-semibold">Transfer Amount Tool</h2>
          <button onClick={onClose} className="rounded-full p-1 text-white hover:text-white">
            <CircleX className="text-white" size={24} />
          </button>
        </div>

        <div className="flex">
          {/* ── Left‐side Tabs ──────────────────────────────────────────── */}
          <div className="mr-8 flex flex-col gap-6 text-sm">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center space-x-2 ${
                activeTab === 'add' ? 'text-brand-mint' : 'text-white'
              }`}
            >
              <MoneySendIcon
                className={`flex items-center space-x-2 ${
                  activeTab === 'add' ? '[&>path]:fill-[#1c83ff]' : '[&>path]:fill-white'
                }`}
              />
              <span>Add</span>
            </button>

            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex items-center space-x-2 ${
                activeTab === 'withdraw' ? 'text-brand-mint' : 'text-white'
              }`}
            >
              <MoneyReciveIcon
                className={`flex items-center space-x-2 ${
                  activeTab === 'withdraw' ? '[&>path]:fill-[#1c83ff]' : '[&>path]:fill-white'
                }`}
              />
              <span>Withdraw</span>
            </button>
          </div>

          {/* ── Right‐side Form ─────────────────────────────────────────── */}
          <div className="flex-1 rounded-lg bg-light p-4">
            {/* Labels row */}
            <div className="mb-2 flex text-sm text-white">
              <div className="flex-1 px-2">From</div>
              <div className="flex-1 px-2">Amount</div>
              <div className="flex-1 px-2">To</div>
            </div>

            <div className="flex">
              <div className="relative flex-1 px-2 text-xs">
                {activeTab === 'add' ? (
                  /* “Add” mode: FROM is a dropdown of Wallets */
                  <div>
                    <button
                      onClick={() => {
                        setFromOpen(o => !o);
                        setToOpen(false);
                      }}
                      className="
                        flex w-full items-center justify-between gap-2 
                        rounded bg-light px-3 py-2 text-left text-white
                        focus:outline-none
                      "
                    >
                      <span>{selectedFrom}</span>
                      <ArrowSquareDownIcon className="text-white" />
                    </button>

                    {fromOpen && (
                      <ul
                        className="
                          absolute left-0 top-[calc(100%+4px)] z-10 w-full
                          rounded border border-white/60  bg-light shadow-lg
                        "
                      >
                        {WALLET_OPTIONS.map(opt => (
                          <li
                            key={opt}
                            onClick={() => {
                              setSelectedFrom(opt);
                              setFromOpen(false);
                            }}
                            className="
                              cursor-pointer rounded px-3 py-2 text-sm 
                              text-white transition-all duration-300 hover:bg-light/80
                            "
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  /* “Withdraw” mode: FROM is a username input */
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={usernameValue}
                    onChange={e => setUsernameValue(e.target.value)}
                    className="
                      h-[2.5rem] w-full rounded bg-light px-3 py-3 
                      text-white placeholder:text-xs placeholder:text-white
                      focus:outline-none
                    "
                  />
                )}
              </div>

              {/* 2) AMOUNT column (always an input) */}
              <div className="flex-1 px-2">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amountValue}
                  onChange={e => setAmountValue(e.target.value)}
                  className="
                    h-[2.5rem] w-full rounded bg-light px-3 py-2
                    text-white placeholder:text-xs placeholder:text-white
                    focus:outline-none
                  "
                />
              </div>

              {/* 3) TO column */}
              <div className="relative flex-1 px-2 text-xs">
                {activeTab === 'add' ? (
                  /* “Add” mode: TO is username input */
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="
                      h-[2.5rem] w-full rounded bg-light px-3 py-3
                      text-white placeholder:text-xs placeholder:text-white
                      focus:outline-none
                    "
                  />
                ) : (
                  /* “Withdraw” mode: TO is a dropdown of Wallets */
                  <div>
                    <button
                      onClick={() => {
                        setToOpen(o => !o);
                        setFromOpen(false);
                      }}
                      className="
                        flex w-full items-center justify-between gap-2 
                        rounded bg-light px-3 py-2 text-left text-white
                        focus:outline-none
                      "
                    >
                      <span>{selectedTo}</span>
                      <ArrowSquareDownIcon className=" text-white" />
                    </button>

                    {toOpen && (
                      <ul
                        className="
                          absolute left-0 top-[calc(100%+4px)] z-10 w-full
                          rounded border border-white/60  bg-light shadow-lg
                        "
                      >
                        {WALLET_OPTIONS.map(opt => (
                          <li
                            key={opt}
                            onClick={() => {
                              setSelectedTo(opt);
                              setToOpen(false);
                            }}
                            className="
                              cursor-pointer rounded px-3 py-2 text-sm 
                              text-white transition-all duration-300 hover:bg-light/80
                            "
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <div className="mt-6 flex justify-end">
          <Button
            title="Confirm"
            variant="confirm"
            size="lg"
            compact
            className="capitalize"
            onClick={() => {
              console.log({
                mode: activeTab,
                from: activeTab === 'add' ? selectedFrom : usernameValue,
                amount: amountValue,
                to: activeTab === 'add' ? usernameValue : selectedTo,
              });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferAmountModal;
