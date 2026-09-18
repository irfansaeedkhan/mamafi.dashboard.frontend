'use client';

import WalletBalanceCard from './WalletBalanceCard';
import TrackingCard from './TrackingCard';
import FailedTransactionsCard from './FailedTransactionsCard';
import AlertsCard from './AlertsCard';

const WalletBalance = () => {
  const transactionStats = [
    { label: 'Track Daily', deposits: '$ 51,340', withdrawals: '$ 23,100' },
    { label: 'Track Weekly', deposits: '$ 51,340', withdrawals: '$ 23,100' },
    { label: 'Track Monthly', deposits: '$ 51,340', withdrawals: '$ 23,100' },
  ];

  const alerts = [
    { id: '1', message: 'John Doe has a failure for transaction, please check it out what' },
    { id: '2', message: 'Your balance is low under $10,000. Please deposit to your' },
    { id: '3', message: 'John Doe has a failure for transaction, please check it out what' },
    { id: '4', message: 'Your balance is low under $10,000. Please deposit to your' },
    { id: '5', message: 'John Doe has a failure for transaction, please check it out what' },
    { id: '6', message: 'Your balance is low under $10,000. Please deposit to your' },
  ];

  return (
    <div className="px-0 pb-6 text-white">
      <div className="mb-6">
        <h1 className="text-gradient text-2xl font-bold">Transaction Management</h1>
        <p className="text-sm text-white">
          Oversee and manage all financial transactions on the platform, including deposits,
          withdrawals, and purchases.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WalletBalanceCard balance="$ 256,250" />

        <TrackingCard transactionStats={transactionStats} />

        <FailedTransactionsCard failedCount={56} />

        <AlertsCard alerts={alerts} />
      </div>
    </div>
  );
};

export default WalletBalance;
