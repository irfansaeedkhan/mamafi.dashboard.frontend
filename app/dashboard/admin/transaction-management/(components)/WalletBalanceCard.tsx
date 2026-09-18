import { Button } from '@/components/shared';
import Link from 'next/link';
import { useState } from 'react';

interface WalletBalanceCardProps {
  balance?: string;
  className?: string;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance = '$ 256,250',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState('Admin');

  return (
    <div className={`rounded-[20px] box-3d p-6 ${className}`}>
      <div className="mb-4">
        <div className="border-gray-800 flex justify-between">
          <h2 className="text-white mr-8 text-base">Wallet Balances</h2>
          <div className="flex">
            <button
              className={`px-4 pb-2 text-xs ${
                activeTab === 'Admin' ? 'border-green border-b-2 text-brand-mint' : ' text-white'
              }`}
              onClick={() => setActiveTab('Admin')}
            >
              Admin
            </button>
            <button
              className={`px-4 pb-2 text-xs ${
                activeTab === 'Spender' ? 'border-green border-b-2' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('Spender')}
            >
              Spender
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 flex flex-col gap-3 rounded-xl border border-transparent bg-light p-4">
        <div className="mb-1 text-sm text-white">Available Balance</div>
        <div className="text-4xl font-normal text-brand-mint">{balance}</div>
        <Link href="/dashboard/admin/transaction-management/wallet-balance">
          <Button title="Manage" variant="confirm" size="sm" compact />
        </Link>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
