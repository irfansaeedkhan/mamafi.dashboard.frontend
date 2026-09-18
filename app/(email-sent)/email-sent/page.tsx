import React from 'react';

const EmailSentPage = () => {
  return (
    <div className="flex max-w-[40ch] flex-col gap-6 text-center">
      <h2 className="text-gradient font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
        Activation Link Sent to Your Email
      </h2>
      <p className="font-nexa text-sm font-normal text-white">
        Complete your registration with ease by clicking on the activation link in your inbox.{' '}
      </p>
    </div>
  );
};

export default EmailSentPage;
