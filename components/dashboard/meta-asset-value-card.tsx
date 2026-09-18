import React from 'react';

interface Props {
  title: string;
  amount: number;
  icon: React.ReactNode;
  token: string;
}

export const SigillumValueCard: React.FC<Props> = ({ title, amount, icon, token }) => {
  return (
    <div className="col-span-1 flex min-h-[204px] w-full flex-col justify-between rounded-xl box-3d px-6 pb-5 pt-8 shadow-2">
      <div className="flex gap-3">
        <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#28272F]/10">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-white">{title}</p>
          <p className="text-xl font-bold text-white">
            {amount?.toFixed(2)}
            {token}
          </p>
        </div>
      </div>
    </div>
  );
};
