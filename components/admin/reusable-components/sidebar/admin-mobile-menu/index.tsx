'use client';

import clsx from 'clsx';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';

import { AdminSidebarData } from '../admin-sidebar-data';
import './menu.css';

const AdminMobileMenu = ({
  toggle,
  handleClose,
  logoutHandler,
  profileData,
}: {
  toggle: boolean;
  handleClose: any;
  logoutHandler: any;
  profileData: any;
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const tl = useRef(gsap.timeline({ paused: true }));
  const pathname = usePathname();
  const router = useRouter();

  // Function to add refs dynamically with proper typing
  const addToRefs = (el: HTMLAnchorElement | null) => {
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
    <div className="menu-container" ref={container}>
      <div className="menu-overlay">
        <div className={`z-50 w-full overflow-x-hidden lg:overflow-visible`}>
          <div
            className={clsx(
              `z-[2000] flex min-h-screen w-full flex-shrink-0 flex-col justify-between bg-primary duration-300 ease-linear lg:hidden lg:w-[300px]`
            )}
          >
            <button type="button" onClick={handleClose} className="absolute right-4 top-6">
              <FaTimes className="size-6 h-6 w-6 shrink-0 text-gradient" />
            </button>
            <div className="flex h-full flex-1 flex-col justify-between">
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-4 px-6 pt-20">
                  <div className="flex flex-col items-center">
                    <FaCircleUser className="size-20 h-20 w-20 shrink-0 text-gradient" />
                    <h3 className="pt-4 text-xl font-semibold text-gradient">
                      {`${profileData?.Name ?? ''} ${profileData?.Surname ?? ''}`}
                    </h3>
                  </div>
                </div>

                <hr className="mb-14 mt-9 h-[2px] border-0 bg-light" />
                <div className="flex flex-col items-center px-6 lg:items-start">
                  <div className="mx-auto flex w-full flex-col items-start justify-center gap-6 px-4">
                    {AdminSidebarData.map(item => (
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
                              ? 'text-gradient'
                              : 'lg:group-hover:cool-link text-white'
                          )}
                        >
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-10 flex w-full flex-col items-center justify-start gap-3 px-6">
                <Button
                  title="Switch to User"
                  variant="confirm-secondary"
                  size="sm"
                  compact
                  className="mt-4 w-full"
                  onClick={() => {
                    handleClose();
                    router.push(AppRoutes.dashboard.index);
                  }}
                />
                <Button
                  title="logout"
                  variant="confirm"
                  size="sm"
                  compact
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

export default AdminMobileMenu;
