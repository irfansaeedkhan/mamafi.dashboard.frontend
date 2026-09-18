'use client';

import { getUnlockLevels, UnlockLevelsResponse } from '@/lib/auth/get-levels';
import { formatNumber } from '@/utils/format-numbers-dash';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const LevelsToUnlock = () => {
  const [data, setData] = useState<UnlockLevelsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLevels = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getUnlockLevels();
      setData(res);
    } catch (error: any) {
      console.error('Failed to fetch levels:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
        <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
      </div>
    );
  }

  const weeklyReward = parseFloat(data?.weeklyReward ?? '0');
  const level1Reward = parseFloat(data?.level1Reward ?? '0');
  const level2Reward = parseFloat(data?.level2Reward ?? '0');
  const level3Reward = parseFloat(data?.level3Reward ?? '0');

  // Investment thresholds per level
  const investmentRequired: Record<number, number> = { 1: 100, 2: 500, 3: 2500 };

  const levels = [
    {
      level: 1,
      reward: level1Reward,
      isUnlocked: data?.level1 ?? false,
      remainingToUnlock: data?.remainingToUnlock1 ?? 0,
      investmentRequired: investmentRequired[1],
    },
    {
      level: 2,
      reward: level2Reward,
      isUnlocked: data?.level2 ?? false,
      remainingToUnlock: data?.remainingToUnlock2 ?? 0,
      investmentRequired: investmentRequired[2],
    },
    {
      level: 3,
      reward: level3Reward,
      isUnlocked: data?.level3 ?? false,
      remainingToUnlock: data?.remainingToUnlock3 ?? 0,
      investmentRequired: investmentRequired[3],
    },
  ];

  // Summary table: base + 3 levels
  const summaryRows = [
    { label: 'Base Weekly Return', percentage: weeklyReward, isBase: true, isUnlocked: true },
    { label: 'Level 1 Bonus', percentage: level1Reward, isBase: false, isUnlocked: data?.level1 ?? false },
    { label: 'Level 2 Bonus', percentage: level2Reward, isBase: false, isUnlocked: data?.level2 ?? false },
    { label: 'Level 3 Bonus', percentage: level3Reward, isBase: false, isUnlocked: data?.level3 ?? false },
  ];

  return (
    <div className="z-10 flex flex-col gap-6">
      <div className="rounded-xl box-3d p-6 text-white z-10">
        <h2 className="text-xl font-bold text-white md:text-2xl">Your Weekly Earnings Overview</h2>
        <p className="pt-2 text-base text-white md:text-xl">
          Here&apos;s a summary of your current weekly returns and available bonus levels.
        </p>

        <div className="mt-6 flex flex-col gap-6 xl:flex-row lg:gap-8 h-full">
          <div className="flex w-full lg:w-[40%] flex-col gap-3">
            <div className="flex items-center gap-10 xl:gap-8">
              <Image
                src="/images/calender.svg"
                alt="Calendar icon"
                width={60}
                height={60}
                className="shrink-0 w-20 md:w-16"
                unoptimized
              />
              <div className="flex flex-col gap-1">
                <p className="text-base font-bold text-white">Total Weekly Return</p>
                <p className="text-xs md:text-sm text-white">Automatically active for all users</p>
                <p className="text-xl font-bold text-white md:text-2xl">
                  {weeklyReward.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-[60%] flex-col gap-4 lg:border-l-2 lg:border-brand-gold lg:pl-8">
            <h3 className="text-base font-bold text-white">Levels Summary Table</h3>
            <div className="flex flex-col gap-3">
              {summaryRows.map((row, index) => {
                const isGradientPercentage = row.isBase || row.isUnlocked;

                return (
                  <div key={index} className="grid grid-cols-3 items-center">
                    <p className="text-sm font-bold text-white text-left">
                      {row.label}
                    </p>
                    <div className="flex justify-center">
                      <p className={`text-base md:text-xl font-bold ${isGradientPercentage ? 'text-white' : 'text-[#666666]'}`}>
                        +{row.percentage.toFixed(1)}%
                      </p>
                    </div>
                    <p
                      className={`${row.isBase ? 'text-xs md:text-sm' : 'text-base'} font-bold ${
                        row.isBase
                          ? 'text-white uppercase'
                          : row.isUnlocked
                            ? 'text-[#1c83ff]'
                            : 'text-brand-red'
                      } text-right`}
                    >
                      {row.isBase
                        ? 'AUTOMATICALLY ACTIVE FOR ALL USERS'
                        : row.isUnlocked
                          ? 'Unlocked'
                          : 'Locked'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {levels.map((level) => (
          <div
            key={level.level}
            className="rounded-xl box-3d p-6 text-white z-10"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-white">Level {level.level}</h3>
                    {!level.isUnlocked && (
                      <div className="flex flex-col gap-1">
                        <p className="text-xl font-bold text-white">
                          Unlock this level by investing at least ${formatNumber(level.investmentRequired)}.
                        </p>
                        {level.remainingToUnlock > 0 && (
                          <p className="text-xl font-bold text-[#666666]">
                            You still need ${formatNumber(level.remainingToUnlock)} to unlock this bonus.
                          </p>
                        )}
                      </div>
                    )}
                    {level.isUnlocked && (
                      <div className="flex flex-col gap-1">
                        <p className="text-xl font-bold text-white">
                          You have met the minimum investment requirement of ${formatNumber(level.investmentRequired)}.
                        </p>
                        <p className="text-xl font-bold text-white">
                          This bonus is now added to your weekly return.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p
                  className={`text-base font-bold ${
                    level.isUnlocked ? 'text-[#1c83ff]' : 'text-brand-red'
                  }`}
                >
                  {level.isUnlocked ? 'Unlocked' : 'Locked'}
                </p>
                <button
                  disabled={!level.isUnlocked}
                  className={`rounded-lg border px-6 py-2 text-xl font-bold ${
                    level.isUnlocked
                      ? 'bg-gradient-to-r from-[#FF294F] to-[#1C83FF] border-[#1c83ff] text-white'
                      : 'bg-[#293132] text-[#666] border-[#FF3235]'
                  }`}
                >
                  +{level.reward.toFixed(1)}%
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelsToUnlock;
