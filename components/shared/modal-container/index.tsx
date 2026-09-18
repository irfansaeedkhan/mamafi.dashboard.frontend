import React, { useEffect, useRef } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import cn from '@/utils/cn';
import { ModalPortal } from './modal-portal';

interface Props {
  children?: React.ReactNode;
  modalId: string;

  isOpen: boolean;
  onClose: () => void;

  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;

  modalClassName?: string;
  modalContentClassName?: string;
}

const ModalContainer: React.FC<Props> = ({
  modalId,
  isOpen,
  onClose,
  children,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  modalClassName,
  modalContentClassName,
}) => {
  const htmlBodyRef = useRef<HTMLBodyElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    htmlBodyRef.current = document.body as HTMLBodyElement;
  }, []);

  useEventListener(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && shouldCloseOnEsc) {
        onClose();
      }
    },
    htmlBodyRef as React.RefObject<HTMLElement>
  );

  useEffect(() => {
    if (!htmlBodyRef.current) return;
    if (isOpen) {
      htmlBodyRef.current.style.overflow = 'hidden';
    } else {
      htmlBodyRef.current.style.overflow = 'auto';
    }
  }, [isOpen]);

  useOnClickOutside(modalContentRef as React.RefObject<HTMLElement>, () => {
    if (!shouldCloseOnOverlayClick) return;
    onClose();
  });

  if (!isOpen) return null;

  return (
    <ModalPortal wrapperId={modalId}>
      <div
        className={cn(
          'fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0A0A0EBF] outline-none backdrop-blur-[5.5px] backdrop-filter',
          modalClassName
        )}
      >
        <div
          ref={modalContentRef}
          className={cn(
            'relative m-4 max-w-xl flex-grow !rounded-xl box-3d bg-dark px-4 py-5 lg:!p-6',
            modalContentClassName
          )}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalContainer;
