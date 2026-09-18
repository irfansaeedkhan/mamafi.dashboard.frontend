'use client';

import { Button } from '@/components/shared';
import { AdminAppRoutes, AppRoutes } from '@/constants/app-routes';
import { useTutorial } from '@/hooks/use-tutorial';
import clsx from 'clsx';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { SidebarData } from '../dashboard/sidebar-data';
import './menu.css';

const MobileMenu = ({
  toggle,
  handleClose,
  logoutHandler,
  profileData,
  onOpenComingSoonModal,
}: {
  toggle: boolean;
  handleClose: any;
  logoutHandler: any;
  profileData: any;
  onOpenComingSoonModal: () => void;
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
  const tl = useRef(gsap.timeline({ paused: true }));
  const pathname = usePathname();
  const router = useRouter();
  const { openTutorial } = useTutorial();

  // Function to add refs dynamically with proper typing
  const addToRefs = (el: HTMLAnchorElement | HTMLButtonElement | null) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.set(linkRefs.current, { y: 75, opacity: 0 });
    tl.current
      .to('.menu-overlay', {
        duration: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power4.inOut',
      })
      .to(
        linkRefs.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power4.inOut',
          duration: 0.8,
        },
        '-=0.75'
      )
      .pause();
  }, []);

  useEffect(() => {
    if (toggle) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [toggle]);

  return (
    <div className="menu-container z-[2000]" ref={container}>
      <div className="menu-overlay  h-full touch-pan-y overflow-y-auto">
        <div className={`z-50 w-full overflow-x-hidden lg:overflow-visible `}>
          <div
            className={clsx(
              `relative z-[2000] flex min-h-screen w-full flex-col justify-between overflow-y-auto bg-primary pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] duration-300 ease-linear lg:hidden lg:w-[300px]`
            )}
          >
            <button type="button" onClick={handleClose} className="absolute right-4 top-6 z-50">
              <FaTimes className="size-6 h-6 w-6 shrink-0 text-white" />
            </button>
            <div className="flex h-full flex-1 flex-col justify-between">
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-4 px-6 pt-14">
                  <Link
                    href={AppRoutes.profile.my_profile}
                    className="flex flex-col items-center"
                    onClick={handleClose}
                  >
                    <FaCircleUser className="size-20 shrink-0 text-white" />
                    <h3 className="pt-4 text-xl font-semibold text-white">
                      {`${profileData?.Name ?? ''} ${profileData?.Surname ?? ''}`}
                    </h3>
                    <span className={clsx('text-white flex-shrink-0 pt-1 text-sm font-medium')}>
                      View Profile
                    </span>
                  </Link>
                </div>

                <hr className="mb-14 mt-9 h-[2px] border-0 bg-brand-gold" />
                <div className="flex flex-col items-center px-6 lg:items-start">
                  <div className="mx-auto flex w-full flex-col items-start justify-center gap-6 px-4">
                    {SidebarData.map(item =>
                      item.comingSoon ? (
                        <button
                          ref={addToRefs}
                          type="button"
                          key={item.title}
                          onClick={() => {
                            onOpenComingSoonModal();
                            handleClose();
                          }}
                          className="menu-link-item flex w-full items-center justify-start gap-4"
                        >
                          <item.icon className="size-6 h-6 w-6 flex-shrink-0 fill-white" />
                          <p className="h-[1.063rem] flex-shrink-0 text-sm font-medium text-white lg:block">
                            {item.title}
                          </p>
                        </button>
                      ) : (
                        <Link
                          ref={addToRefs}
                          href={item.link}
                          key={item.link}
                          onClick={handleClose}
                          className="menu-link-item flex w-full items-center justify-start gap-4"
                        >
                          <item.icon
                            className={clsx(
                              'size-6 h-6 w-6 flex-shrink-0',
                              pathname === item.link ? 'fill-brand-gold' : 'fill-white'
                            )}
                          />
                          <p
                            className={clsx(
                              'h-[1.063rem] flex-shrink-0 text-sm font-medium lg:block',
                              pathname === item.link
                                ? 'text-white'
                                : 'lg:group-hover:cool-link text-white'
                            )}
                          >
                            {item.title}
                          </p>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-10 mt-auto flex w-full flex-col items-center justify-start gap-5 px-6 pb-[calc(env(safe-area-inset-bottom)+4.5rem)]">
                <Button
                  title="Switch to Admin"
                  variant="confirm"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    handleClose();
                    router.push(AdminAppRoutes.dashboard.index);
                  }}
                />
                <Button
                  title="View Tutorial"
                  variant="confirm-secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    openTutorial();
                    handleClose();
                  }}
                />
                <Button
                  title="logout"
                  size="lg"
                  className="w-full"
                  onClick={logoutHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
