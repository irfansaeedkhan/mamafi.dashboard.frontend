import { DollarCoin, ExclaimationIcon } from '@/assets/svgs';
import { InvoicesType, getInvoicesList } from '@/lib/auth/get-invoices';
import { isNextDisabled, isPrevDisabled } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import { RiDownload2Fill } from 'react-icons/ri';
import TotalNumberField from '../shared/total-number-field';
import { YearDropdown } from './year-drop-down';
import generateInvoicePDF from '../profile/generate-invoice-pdf';

export const InvoiceTableMobile: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [invoicesData, setInvoicesData] = useState<InvoicesType[]>();

  const getInvoicesDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getInvoicesList(page);
      const list = Array.isArray(res) ? res : (res?.Invoices ?? res?.data ?? []);
      setInvoicesData(list);
      setTotalPages(res?.Number_of_Pages ?? (list.length ? 1 : 0));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const dataYears = [
    { value: 'all', label: 'All' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    getInvoicesDetails();
  }, [getInvoicesDetails]);

  const filteredTransactions =
    invoicesData &&
    invoicesData.filter(transaction => {
      if (selectedYear === 'all') return true;
      return dayjs(transaction.date).format('YYYY') === selectedYear;
    });

  const handleDownloadPDF = (invoice: InvoicesType) => {
    try {
      generateInvoicePDF([
        { field: 'Invoice ID', value: invoice.id },
        { field: 'Date', value: invoice.date ? dayjs(invoice.date).format('DD MMM YYYY') : 'N/A' },
        { field: 'Duration', value: `${invoice.duration} weeks` },
        { field: 'Quantity', value: invoice.quantity },
        { field: 'Single pack cost', value: `${invoice.meta_asset_price} US$` },
        { field: 'Total amount', value: `${invoice.meta_asset_price * invoice.quantity} US$` },
      ]);
      toast.success('Invoice downloaded');
    } catch (error) {
      console.error('Error downloading the PDF:', error);
      toast.error('Unable to download invoice');
    }
  };

  return (
    <div className=" flex w-full flex-col rounded-xl text-white md:hidden">
      <div className="flex h-16 items-center justify-between gap-5 rounded-t-xl bg-light px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium leading-7">Transactions</span>
          {filteredTransactions && (
            <TotalNumberField bgColor="bg-light" length={filteredTransactions.length} />
          )}
        </div>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={year => handleYearChange(year)}
        />
      </div>
      <div className="flex flex-col bg-primary">
        {filteredTransactions && filteredTransactions.length > 0 ? (
          filteredTransactions.map((invoice, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-3 border-b border-light bg-light p-6 last:rounded-b-xl last:border-none"
            >
              <div className={mainDiv}>
                <h6 className={h6}>Duration</h6>
                <p className={p}> {invoice?.duration ?? 'N/A'} weeks</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Qty </h6>
                <p className={p}> {invoice?.quantity ?? 'N/A'}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>SinglePackCost </h6>
                <p className={p}>
                  <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                  {invoice?.meta_asset_price ?? 'N/A'} US$
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Date</h6>
                <p className={p}>
                  {invoice?.date ? dayjs(invoice?.date).format('DD MMM YYYY') : 'N/A'}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>TotalAmount </h6>
                <p className={p}>
                  <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                  <span>
                    {invoice?.meta_asset_price != null && invoice?.quantity != null
                      ? invoice.meta_asset_price * invoice.quantity
                      : 'N/A'}{' '}
                    US$
                  </span>
                </p>
              </div>

              <div className={mainDiv}>
                <h6 className={h6}>Download Invoice</h6>
                <button onClick={() => handleDownloadPDF(invoice)}>
                  <RiDownload2Fill className="size-6 h-6 w-6 shrink-0 text-white" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 py-10">
            <ExclaimationIcon className="size-8 mx-auto shrink-0 cursor-pointer [&>path]:fill-white" />
            <h3 className="text-center text-sm text-white">There is no invoices.</h3>
          </div>
        )}
      </div>
      {totalPages > 0 && (
        <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
          <button
            onClick={() => page > 1 && setPage(prev => prev - 1)}
            disabled={isPrevDisabled(page)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] px-4 py-2 text-sm disabled:opacity-50"
          >
            <HiMiniArrowLeft /> Previous
          </button>
          <button
            onClick={() => page < totalPages && setPage(prev => prev + 1)}
            disabled={isNextDisabled(page, totalPages)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] px-4 py-2 text-sm disabled:opacity-50"
          >
            Next <HiMiniArrowRight />
          </button>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin" />
        </div>
      )}
    </div>
  );
};

const mainDiv = 'flex w-full items-center justify-between gap-5';
const h6 = 'text-sm  leading-[18px]';
const p = 'text-sm leading-5 flex items-center gap-1';
