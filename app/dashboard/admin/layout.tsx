'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/reusable-components/sidebar/admin-sidebar';
import { AdminHeader } from '@/components/admin/reusable-components/sidebar/admin-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [toggle, SetToggle] = useState(false);
  return (
    // <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full relative flex h-auto min-h-dvh w-full gap-[2rem] overflow-y-auto px-6 scrollbar-thin scrollbar-track-[#0A1E2F] scrollbar-thumb-brand-gold">
    <div className="flex min-h-dvh">
      <AdminSidebar toggle={toggle} setToggle={SetToggle} />
      {/* <div className="flex w-[80%] flex-col bg-primary"> */}
      <div className="w-full flex-1 pr-6">
        <div className="flex flex-col bg-primary">
          <AdminHeader toggle={toggle} setToggle={SetToggle} />
          {/* <div className="max-h-[calc(100vh-64px)] pb-20 sm:max-h-[calc(100vh)] md:pb-0 "> */}
          <div className="h-full w-full pb-20 sm:max-h-[calc(100vh)] ">
            <div className="pb-5 pt-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
