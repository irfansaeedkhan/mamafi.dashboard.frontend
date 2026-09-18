'use client';
import React from 'react';

interface SingleCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const SingleCheckbox: React.FC<SingleCheckboxProps> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label className={`flex cursor-pointer items-center gap-2 ${className}`}>
      <div
        onClick={() => onChange(!checked)}
        className={`max-h-4 min-h-4 min-w-4 max-w-4 shrink-0 rounded-sm border transition ${
          checked ? 'border-[#1c83ff] bg-[#1c83ff]' : 'border-[#334155] bg-[#05121E]'
        }`}
      />
      {label && (
        <span onClick={() => onChange(!checked)} className="shrink-0 text-sm text-white">
          {label}
        </span>
      )}
    </label>
  );
};

export default SingleCheckbox;
