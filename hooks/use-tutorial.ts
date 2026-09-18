'use client';

import { useTutorialStore } from '@/stores/tutorial.store';

export const useTutorial = () => {
  const showTutorial = useTutorialStore(state => state.isOpen);
  const initializeTutorial = useTutorialStore(state => state.initialize);
  const markTutorialAsComplete = useTutorialStore(state => state.markComplete);
  const openTutorial = useTutorialStore(state => state.open);
  const closeTutorial = useTutorialStore(state => state.close);
  const resetTutorial = useTutorialStore(state => state.reset);
  const isInitialized = useTutorialStore(state => state.isInitialized);

  return {
    showTutorial,
    initializeTutorial,
    markTutorialAsComplete,
    openTutorial,
    closeTutorial,
    resetTutorial,
    isInitialized,
  };
};
