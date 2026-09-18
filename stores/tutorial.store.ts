'use client';

import { create } from 'zustand';

const TUTORIAL_STORAGE_KEY = 'hasSeenTutorial';

type InitializeOptions = {
  isFirstLogin?: boolean;
};

interface TutorialStore {
  isOpen: boolean;
  isInitialized: boolean;
  initialize: (options?: InitializeOptions) => void;
  open: () => void;
  close: () => void;
  markComplete: () => void;
  reset: () => void;
}

export const useTutorialStore = create<TutorialStore>((set, get) => ({
  isOpen: false,
  isInitialized: false,
  initialize: (options?: InitializeOptions) => {
    const { isInitialized } = get();
    if (isInitialized) return;
    if (typeof window === 'undefined') return;

    const hasSeenTutorial = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    
    // If localStorage says they've seen it, don't show
    if (hasSeenTutorial === 'true') {
      set({ isOpen: false, isInitialized: true });
      return;
    }

    // If localStorage is cleared/missing, check backend flag
    const shouldOpen = options?.isFirstLogin !== false;

    set({ isOpen: shouldOpen, isInitialized: true });
  },
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  markComplete: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    }
    set({ isOpen: false });
  },
  reset: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TUTORIAL_STORAGE_KEY);
    }
    set({ isOpen: true });
  },
}));

export { TUTORIAL_STORAGE_KEY };

