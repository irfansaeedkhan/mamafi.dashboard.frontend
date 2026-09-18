'use client';
import Image from 'next/image';
import React from 'react';

interface Props {
  page_name: 'login' | 'register';
}

const LeftSide: React.FC<Props> = ({ page_name }) => {
 
  return (
    <Image
      src='/images/mag-cover.png'
      alt="left side image"
      width={1280}
      height={720}
      className="flex-shrink-0"
      unoptimized
    />
  );
};

export default LeftSide;
