import { InfoIconGradient } from '@/assets/svgs';
import React, { useState } from 'react';

type InfoIconWithTooltipProps = {
  text: string;
  color?: string;
};

const InfoIconWithTooltip: React.FC<InfoIconWithTooltipProps> = ({ text, color: _color }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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
        <InfoIconGradient className="h-6 w-6 shrink-0" />
      </span>
      {isTooltipVisible && (
        <div className="absolute right-0 mt-2 min-w-[20ch] max-w-[37ch] rounded bg-light px-3 py-2 text-xxs text-white shadow-lg gradient-border">
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoIconWithTooltip;
