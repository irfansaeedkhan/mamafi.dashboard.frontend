import cn from '@/utils/cn';
import React from 'react';

const TotalNumberField = ({
  length,
  bgColor = 'bg-light',
}: {
  length: number;
  bgColor?: string;
}) => {
  if (!length) {
    return (
      <span className="relative inline-block rounded-xl">
        <span
          className={cn(
            `flex h-full w-full items-center justify-center rounded-xl bg-brand-gold px-2 text-xs text-dark`
          )}
        >
          <div className="px-2 leading-[1.063rem] text-dark"> N/A </div>
        </span>
      </span>
    );
  }
  return (
    <span className="relative inline-block rounded-xl">
      <span
        className={cn(
          `flex h-full w-full items-center justify-center rounded-xl bg-brand-gold px-3 py-1 text-dark`
        )}
      >
        <h6 className="flex h-3 items-center justify-center text-xs leading-[normal] text-dark">
          {length}
        </h6>
      </span>
    </span>
  );
};

export default TotalNumberField;
