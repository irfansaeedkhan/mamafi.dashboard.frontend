'use client';
import { ExclaimationIcon } from '@/assets/svgs';
import { InvoiceTableMobile } from '@/components/dashboard/invoice-table-mobile';
import { InvoiceTable, ProfileCommonTop } from '@/components/profile';

const MyInvoice = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="block w-full lg:hidden">
        <ProfileCommonTop />
      </div>
      <div className="flex w-full items-center gap-2 rounded-xl bg-light p-3 lg:mb-8">
        <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
        <div className="flex flex-col gap-1">
          <h3 className="pt-1 font-kanit text-xs text-white lg:text-sm">
            Invoices complaint with BIA and FSA regulators
          </h3>
        </div>
      </div>
      <div className="z-10 flex w-full flex-col rounded-xl  bg-light">
        <InvoiceTable />
        <InvoiceTableMobile />
      </div>
    </div>
  );
};

export default MyInvoice;
