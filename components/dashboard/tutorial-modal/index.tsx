'use client';
import { Button } from '@/components/shared';
import ModalContainer from '@/components/shared/modal-container';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { TutorialModalProps } from './types';

export const TutorialModal: React.FC<TutorialModalProps> = ({ open, onClose, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide to first when modal opens
  useEffect(() => {
    if (open) {
      setCurrentSlide(0);
    }
  }, [open]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => {
          if (prev > 0) {
            return prev - 1;
          }
          return prev;
        });
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            onClose();
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, slides.length, onClose]);

  const handleSkip = () => {
    onClose();
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const isFirstSlide = currentSlide === 0;

  const currentSlideData = slides[currentSlide];

  return (
    <ModalContainer
      modalId="tutorial-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[500px] w-full bg-dark"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
    >
      <div className="flex w-full flex-col">
        {/* Slide Content */}
        <div className="mb-10 flex flex-col items-center gap-10">
          <div className="relative h-auto w-full">
            <Image
              src={currentSlideData?.topImage || ''}
              alt={`${currentSlideData.title} - preview`}
              className="w-full"
              width={447}
              height={213}
            />
          </div>

          <div className="relative mx-auto mb-2 h-auto w-full max-w-[240px]">
            <Image
              src={currentSlideData?.mainImage || ''}
              alt={currentSlideData.title}
              width={240}
              height={127}
              className="w-full"
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            {/* Title */}
            <h2 className="text-center text-xl uppercase leading-tight text-gradient sm:text-2xl">
              {currentSlideData?.title || ''}
            </h2>
            {/* Subtitle */}
            <p className="text-center text-sm text-white sm:text-base">
              {currentSlideData?.subtitle || ''}
            </p>
          </div>
        </div>

        {/* Navigation Dots - Mobile only (above buttons) */}
        <div className="mb-6 flex items-center justify-center gap-2 md:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-2 bg-brand-gold' : 'w-2 bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 md:gap-4">
          {/* Left Side - Previous or Skip button (First slide only) */}
          {isFirstSlide && (
            <div className="flex-1 md:w-[40%] md:flex-initial">
              <Button
                title="Skip"
                variant="confirm-secondary"
                size="sm"
                compact
                className="w-full md:!w-[6rem]"
                onClick={handleSkip}
              />
            </div>
          )}
          {!isFirstSlide && (
            <div className="flex-1 md:w-[40%] md:flex-initial">
              <Button
                title="Previous"
                variant="confirm-secondary"
                size="sm"
                compact
                className="w-full md:!w-[6rem]"
                onClick={handlePrevious}
                IconStart={<FiChevronLeft className="mr-2 size-4 text-white" />}
              />
            </div>
          )}

          {/* Center - Skip for mobile (middle slides) */}
          {!isFirstSlide && !isLastSlide && (
            <div className="flex flex-1 items-center justify-center md:hidden">
              <Button
                title="Skip"
                variant="confirm-secondary"
                size="sm"
                compact
                className="uppercase"
                onClick={handleSkip}
              />
            </div>
          )}

          {/* Center - Navigation Dots - Desktop only */}
          <div className="hidden items-center justify-center gap-2 md:flex">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-2 bg-brand-gold' : 'w-2 bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Side - Skip + Next together (Desktop middle slides) or just Next */}
          <div className="flex flex-1 gap-2 items-center justify-end md:w-[40%] md:flex-initial">
            {/* Skip Button - Desktop only, middle slides */}
            {!isFirstSlide && !isLastSlide && (
              <div className="hidden md:block">
                <Button
                  title="Skip"
                  variant="confirm-secondary"
                  size="sm"
                  compact
                  className="uppercase"
                  onClick={handleSkip}
                />
              </div>
            )}

            {/* Next/Done Button */}
            <Button
              title={isLastSlide ? 'Done' : 'Next'}
              variant="confirm"
              size="sm"
              compact
              className="w-full md:!w-[6rem]"
              onClick={handleNext}
              IconEnd={
                isLastSlide ? (
                  <FiCheck className="ml-2 size-4 text-white" />
                ) : (
                  <FiChevronRight className="ml-2 size-4 text-white" />
                )
              }
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
