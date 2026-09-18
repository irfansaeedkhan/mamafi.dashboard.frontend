import React from 'react';
import { Button } from '@/components/shared';
import { ExclaimationIcon } from '@/assets/svgs';
import ModalContainer from '../shared/modal-container';

interface Props {
  open: boolean;
  onClose: () => void;
  modelContent: modelContentType;
}

interface modelContentType {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export const KYCMsgModel: React.FC<Props> = ({ open, onClose, modelContent }) => {
  const {
    title = 'form details',
    description = 'details loading',
    buttonText = 'got it',
    onClick = () => {},
  } = modelContent;
  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[440px] max-w-[343px] bg-dark"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <ExclaimationIcon className="mx-auto size-8 shrink-0 cursor-pointer  [&>path]:fill-white" />
            <h3 className="text-gradient pt-2 text-base font-semibold sm:text-xl">{title}</h3>
            <p className="pt-1 text-sm font-normal text-white/70 sm:max-w-[80%]">{description}</p>
          </div>
        </div>
        <Button
          title={buttonText}
          variant="confirm"
          size="lg"
          compact
          className="mt-4 w-full"
          type="submit"
          onClick={onClick}
        />
      </div>
    </ModalContainer>
  );
};
