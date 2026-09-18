import React from 'react';
import LargePurchasingTable from './(components)/large-purchasing-table';
import SuspiciousActivity from './(components)/suspicious-activity';

const EventTrackingPage = () => {
  return (
    <>
      <h2 className="text-white mb-10 text-2xl font-bold">Track Rewards</h2>
      <div className="flex flex-col gap-10">
        <LargePurchasingTable />
        <SuspiciousActivity />
      </div>
    </>
  );
};

export default EventTrackingPage;
