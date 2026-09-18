'use client';
import { Button } from '@/components/shared';
import Link from 'next/link';
import { useState } from 'react';
import AlertActivation from './(components)/alert-activation';
import GenerateReport from './(components)/generate-report';
import RealTimeStates from './(components)/real-time-states';
import VisualAnalytics from './(components)/visual-analytics';

function PlatFormMonetoringPage() {
  const [activeTab, setActiveTab] = useState('Real time stats');
  return (
    <>
      <div className="flex flex-col gap-8 pb-20">
        <div className="flex w-full flex-col gap-5 lg:gap-14">
          <div className="flex flex-col gap-1  pt-8 sm:pt-0">
            <h4 className="text-gradient font-kanit text-xl font-bold lg:text-2xl">
              Platefrom Monitoring & Analytics
            </h4>
            <p className="text-sm text-white">
              Monitor key platfrom metrics and event tracking for performance insights
            </p>
          </div>

          <div className="flex w-full flex-col justify-center gap-5 sm:flex-row sm:items-center">
            <div className="flex w-full items-center justify-between gap-2 rounded-3xl box-3d p-4 sm:w-2/4">
              <h5 className="text-white font-kanit text-base">Event Tracking</h5>
              <Link href="/dashboard/admin/platform-monitoring/event-tracking">
                <Button
                  title="Track Now"
                  variant="confirm"
                  size="lg"
                  compact
                  className="capitalize"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between gap-2 rounded-3xl box-3d p-4 sm:w-2/4">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <h5 className="text-white font-kanit text-base">Track Rewards</h5>
                <p className="text-xs text-white"></p>
              </div>
              <Link href="/dashboard/admin/platform-monitoring/track-rewards">
                <Button
                  title="View Rewards"
                  variant="confirm"
                  size="lg"
                  compact
                  className="capitalize"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="m-2 flex flex-col items-start justify-between gap-3 bg-light sm:flex-row sm:items-center">
          <div className="text-gray-400 w-full rounded-lg">
            <ul className="flex flex-row items-center text-center text-sm text-white">
              {['Real time stats', 'Visual Analytics', 'Alert Activation', 'Generate Report'].map(
                tab => (
                  <li
                    key={tab}
                    className={`cursor-pointer p-3 ${
                      activeTab === tab
                        ? 'border-b-4 border-brand-mint font-semibold text-brand-mint'
                        : ''
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Conditional Components Rendering */}
        {activeTab === 'Real time stats' && <RealTimeStates />}
        {activeTab === 'Visual Analytics' && <VisualAnalytics />}
        {activeTab === 'Alert Activation' && <AlertActivation />}
        {activeTab === 'Generate Report' && <GenerateReport />}
      </div>
    </>
  );
}
export default PlatFormMonetoringPage;
