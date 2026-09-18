import React, { Suspense } from 'react';
import { RenderedPageEmail } from '@/components/verify-email/rendered-page';

const EmailVarifiedPage = () => {
  return (
    <Suspense>
      <RenderedPageEmail />
    </Suspense>
  );
};

export default EmailVarifiedPage;
