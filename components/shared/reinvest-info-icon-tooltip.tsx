import { InfoIconGradient } from '@/assets/svgs';
import React, { useState } from 'react';

interface Props {
  text: string;
  color?: string;
  variant?: 'default' | 'table-header';
}

const ReinvestInfoIconWithTooltip: React.FC<Props> = ({
  text,
  variant = 'default',
  color: _color,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipClasses =
    variant === 'table-header'
      ? 'absolute top-[26px] left-1/2 -translate-x-1/2 mt-0 w-full min-w-[25ch] max-w-[220px] rounded-lg bg-white px-3 py-2 text-xs text-light shadow-lg'
      : 'absolute left-[-170px] top-[26px] mt-2 w-full min-w-[25ch] max-w-[280px] rounded-lg bg-white px-3 py-2 text-xs text-light shadow-lg md:left-[26px] md:top-[-16px] md:max-w-[300px] md:whitespace-normal';

  return (
    <div className="relative z-10 inline-block">
      <span
        role="button"
        tabIndex={0}
        className="inline-flex cursor-pointer"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
        onKeyDown={e => e.key === 'Enter' && setIsTooltipVisible(v => !v)}
      >
        <InfoIconGradient className="size-6 h-6 w-6 shrink-0" />
      </span>

      {isTooltipVisible && <div className={tooltipClasses}>{text}</div>}
    </div>
  );
};

export default ReinvestInfoIconWithTooltip;
