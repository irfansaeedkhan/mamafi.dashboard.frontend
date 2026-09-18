import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const DisplayMessage: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="flex h-auto min-h-screen w-full items-center justify-center">
        <div className="mx-4 flex w-full max-w-[566px] flex-col items-center gap-8 rounded-3xl p-8 sm:mx-0">
          <Image
            src="/images/logo-dark.svg"
            alt="email sent"
            width={100}
            height={100}
            className="size-16 object-cover"
          />
          <div className="flex flex-col gap-6">
            <h2 className="text-center font-kanit text-xl font-semibold leading-normal text-white md:text-[34px]">
              {title}
            </h2>
            <p className="text-center text-sm font-medium text-white md:text-base">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DisplayMessage;
