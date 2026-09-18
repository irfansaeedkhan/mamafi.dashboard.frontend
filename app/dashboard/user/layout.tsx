'use client';

import React, { useEffect, useState } from 'react';
import { Header, Sidebar } from '@/components/dashboard';
import { HeaderTitleSmallScreen } from '@/components/dashboard/header-title-small-screen';
import { usePathname } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';
import { TutorialModal } from '@/components/dashboard/tutorial-modal';
import { tutorialSlides } from '@/components/dashboard/tutorial-modal/tutorial-data';
import { useTutorial } from '@/hooks/use-tutorial';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [toggle, SetToggle] = useState(false);
  const pathname = usePathname();
  const { showTutorial, markTutorialAsComplete } = useTutorial();

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVh, 100);
    });

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <div
      className="--max-w-[1310px] relative mx-auto flex overflow-hidden lg:px-6"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: 'calc(var(--vh, 1vh) * 100)',
      }}
    >
      <Sidebar toggle={toggle} setToggle={SetToggle} />
      {/* <FloatingMenue /> */}
      <div className="flex w-full flex-col bg-primary">
        <Header toggle={toggle} setToggle={SetToggle} />
        <div
          className="custom-scrollbar w-full overflow-y-auto pb-20 lg:pb-0 lg:pt-6"
          style={{
            maxHeight: 'calc(var(--vh, 1vh) * 100 - 64px)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {(pathname === AppRoutes.profile.my_profile ||
            pathname === AppRoutes.profile.my_invoice ||
            pathname === AppRoutes.profile.terms) && (
            <>
              <div className="px-4 lg:px-10">
                <HeaderTitleSmallScreen />
              </div>
            </>
          )}

          <div className="--max-w-[1081px] mx-auto w-full p-4">{children}</div>
        </div>
      </div>
      <div className="absolute bottom-[-5%] left-[40%] z-0 h-[27vw] w-[40vw] rounded-full bg-brand-gold/80 blur-[150px] sm:bottom-[-50%]"></div>
      <div className="absolute bottom-[-5%] right-[40%] z-0 h-[27vw] w-[40vw] rounded-full bg-brand-rust/80 blur-[150px] sm:bottom-[-50%]"></div>
      <TutorialModal open={showTutorial} onClose={markTutorialAsComplete} slides={tutorialSlides} />
    </div>
  );
}
