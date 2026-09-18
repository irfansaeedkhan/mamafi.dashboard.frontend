import React, { useState } from 'react';

const TooltipMessage: React.FC<{ text: string; children: React.ReactNode }> = ({
  text,
  children,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <button
      className="relative inline-block"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onClick={() => setIsTooltipVisible(!isTooltipVisible)}
    >
      {isTooltipVisible && (
        <div className="absolute right-0 mt-4 w-[30ch] rounded border border-brand-gold bg-light px-3 py-2 text-xxs capitalize text-white shadow-lg">
          {text}
        </div>
      )}
      {children}
    </button>
  );
};

export default TooltipMessage;
