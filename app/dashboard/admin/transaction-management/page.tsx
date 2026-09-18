import React from 'react';
import WalletBalance from './(components)/wallet-balance';
import TransactionsTable from './(components)/transaction-table';

const TransactionMAnagementPage = () => {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <WalletBalance />
      <TransactionsTable />
    </div>
  );
};

export default TransactionMAnagementPage;
