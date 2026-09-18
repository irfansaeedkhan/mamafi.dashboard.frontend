'use client';
import { CopyIcon } from '@/assets/svgs';
import { copyText } from '@/utils/copy-text';
import React from 'react';
import toast from 'react-hot-toast';

interface Props {
  value: string;
}

export const ProfileCopyButton: React.FC<Props> = ({ value }) => {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        copyText(value);
        toast.success('Copied to clipboard');
      }}
    >
      <CopyIcon className="size-6 h-6 w-6 shrink-0 cursor-pointer stroke-white hover:stroke-brand-mint" />
    </button>
  );
};
