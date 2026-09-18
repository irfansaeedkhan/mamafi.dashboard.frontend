'use client';

import React from 'react';
import ModalContainer from './modal-container';
import { Button } from '@/components/shared';

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  open,
  onClose,
  title = 'Coming Soon',
  description = 'This feature is under development and will be available soon.',
}) => {
  return (
    <ModalContainer
      modalId="coming-soon-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[420px] bg-dark"
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <div className="flex flex-col items-center gap-4 text-center text-white">
        <h3 className="text-gradient text-2xl font-bold">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
        <Button
        title="Got it"
        variant="confirm"
        size="lg"
        compact
        className="mt-4 w-full"
        onClick={onClose}
      />
      </div>
    </ModalContainer>
  );
};

export default ComingSoonModal;
