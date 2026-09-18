import React, { Suspense } from 'react';
import { ResetPasswordComp } from '@/components/passwords/reset-password-comp';

const ResetPassword = () => {
  return (
    <Suspense>
      <ResetPasswordComp />
    </Suspense>
  );
};

export default ResetPassword;
