import React, { useState } from 'react';
import ModalContainer from '@/components/shared/modal-container';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CgSpinner } from 'react-icons/cg';
import { ManagementUser } from './user-management';
import {
  PersonalInfoPanel,
  RegistrationInfoPanel,
  SigillumHoldingTable,
  TransactionHistoryTable,
  EarningsHistoryTable,
  AffiliatesTable,
  KycPanel,
  ActivityTable,
} from './viewprofile-tabs';
import { toggleRewards } from '@/lib/auth/admin/toggle-rewards';

const TABS = [
  'Personal Info',
  'Registration Info',
  'Sigillum holding',
  'Transaction history',
  'Earnings history',
  'Affiliates',
  'KYC',
  'Activity',
];

interface Props {
  user: ManagementUser;
  onClose(): void;
  onUserUpdate?: () => void; // Optional callback to refresh parent data
}

export default function ViewProfileModal({ user, onClose, onUserUpdate }: Props) {
  const [tab, setTab] = useState(0);
  // Add local state for rewards status
  const [isRewardsEnabled, setIsRewardsEnabled] = useState(user.is_rewards_enabled);
  const [isTogglingRewards, setIsTogglingRewards] = useState(false);
  const [hasDataChanged, setHasDataChanged] = useState(false);

  // If user changes, reset rewards status
  React.useEffect(() => {
    setIsRewardsEnabled(user.is_rewards_enabled);
  }, [user]);

  // Handle modal close - refresh parent if data changed
  const handleClose = () => {
    if (hasDataChanged && onUserUpdate) {
      onUserUpdate();
    }
    onClose();
  };

  // Handle toggle rewards
  const handleToggleRewards = async () => {
    if (isTogglingRewards) return; // Prevent double-clicks

    setIsTogglingRewards(true);
    const previousState = isRewardsEnabled;

    try {
      console.log('🔄 Toggling rewards for user:', {
        userId: user.id,
        email: user.email,
        currentState: isRewardsEnabled,
      });

      const response = await toggleRewards({ userId: user.id });
      console.log('✅ Toggle rewards success:', {
        newState: response.is_rewards_enabled,
        userData: response,
      });

      // Update local state with the new value from API
      setIsRewardsEnabled(response.is_rewards_enabled);

      // Mark that data has changed (will refresh parent on modal close)
      setHasDataChanged(true);

      // Visual feedback
      const statusText = response.is_rewards_enabled ? 'enabled' : 'disabled';
      console.log(`✨ Rewards ${statusText} for ${user.email}`);
    } catch (error: any) {
      console.error('❌ Failed to toggle rewards:', error);

      // Revert to previous state on error
      setIsRewardsEnabled(previousState);

      // Show user-friendly error message
      const errorMsg = error?.message || 'Failed to update rewards status. Please try again.';
      alert(errorMsg);
    } finally {
      setIsTogglingRewards(false);
    }
  };

  return (
    <ModalContainer
      modalId="view-profile"
      isOpen
      onClose={handleClose}
      modalContentClassName="max-w-4xl rounded-xl box-3d bg-dark p-6 text-white"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-gradient text-2xl font-bold">View Profile</h2>
        <IoIosCloseCircleOutline
          className="size-6 h-6 w-6 shrink-0 cursor-pointer text-white"
          onClick={handleClose}
        />
      </div>

      <nav className="mb-6 flex gap-4 overflow-x-auto pb-2">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`whitespace-nowrap pb-1 text-xs ${
              tab === i ? 'border-green border-b-2 text-brand-mint' : 'text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* Panels */}
      {tab === 0 && <PersonalInfoPanel user={user} onAction={onClose} />}
      {tab === 1 && <RegistrationInfoPanel user={user} />}
      {tab === 2 && <SigillumHoldingTable />}
      {tab === 3 && <TransactionHistoryTable />}
      {tab === 4 && <EarningsHistoryTable />}
      {tab === 5 && (
        <>
          {/* Rewards Status Toggle (Connected to API) */}
          {/* <span className="text-gray-400 text-xs">
                  {isRewardsEnabled
                    ? 'User can earn and receive rewards'
                    : 'Rewards are currently disabled'}
                </span> */}
          <div className="mb-6 flex flex-col gap-3 rounded-lg bg-dark/30 p-4">
            <div className="flex items-center justify-end gap-2">
              <span className="text-gray-400 text-xs">Affiliate Status</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xs">No</span>
                <button
                  type="button"
                  aria-label="Toggle Rewards Status"
                  disabled={isTogglingRewards}
                  className={`relative flex h-[20px] w-[40px] items-center rounded-full border border-white/60 transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${isRewardsEnabled ? 'bg-brand-mint' : 'bg-gray-600'}`}
                  onClick={handleToggleRewards}
                >
                  {isTogglingRewards ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CgSpinner className="size-3 h-3 w-3 shrink-0 animate-spin text-white" />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`absolute left-0 top-0 h-[20px] w-[40px] rounded-full transition-colors duration-200 ${isRewardsEnabled ? 'bg-brand-mint' : 'bg-gray-600'}`}
                      />
                      <div
                        className={`absolute top-0 h-[19px] w-[18px] rounded-full bg-dark shadow transition-transform duration-200 ${isRewardsEnabled ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </>
                  )}
                </button>
                <span
                  className={`text-xs font-medium ${isRewardsEnabled ? 'text-brand-mint' : 'text-white'}`}
                >
                  Yes
                </span>
              </div>
            </div>
          </div>

          <AffiliatesTable />
        </>
      )}
      {tab === 6 && <KycPanel user={user} />}
      {tab === 7 && <ActivityTable />}
    </ModalContainer>
  );
}
