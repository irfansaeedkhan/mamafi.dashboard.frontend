'use client';

import { DollarCoin, ExclaimationIcon } from '@/assets/svgs';
import { InvoicesType, getInvoicesList } from '@/lib/auth/get-invoices';
import { isNextDisabled, isPrevDisabled } from '@/utils/table-pagination';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import { RiDownload2Fill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { YearDropdown } from '../dashboard/year-drop-down';
import { TableCell, TableRow } from '../shared';
import TotalNumberField from '../shared/total-number-field';
import generateInvoicePDF from './generate-invoice-pdf';

export const InvoiceTable = () => {
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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

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
    <div className="hidden w-full flex-col bg-light lg:flex">
      <div className="flex items-center justify-between gap-5  px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="text-base text-white lg:text-xl">Invoices</span>

          {filteredTransactions && <TotalNumberField length={filteredTransactions.length} />}
        </div>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={year => handleYearChange(year)}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="text-blue-shade-1 w-full table-auto rounded-lg">
          <thead className="bg-dark">
            <TableRow element="th" className="h-11 w-full bg-dark px-6 py-3 text-sm text-white">
              <TableCell element={'th'} className="!py-0">
                Duration
              </TableCell>
              <TableCell element={'th'} className="!py-0">
                Qty
              </TableCell>
              <TableCell element={'th'} className="!py-0">
                SinglePackCost
              </TableCell>
              <TableCell element={'th'} className="!py-0">
                Date
              </TableCell>
              <TableCell element={'th'} className="!py-0">
                TotalAmount
              </TableCell>
              <TableCell element={'th'} className="!py-0">
                Download Invoice
              </TableCell>
            </TableRow>
          </thead>
          <tbody>
            {filteredTransactions && filteredTransactions?.length > 0 ? (
              filteredTransactions?.map(invoice => (
                <TableRow
                  element="tb"
                  key={invoice?.id}
                  className="w-full overflow-x-auto bg-light px-6 py-4 text-sm last:rounded-b-2xl"
                >
                  <TableCell element={'td'}>{invoice?.duration} weeks</TableCell>
                  <TableCell element={'td'}>{invoice?.quantity}</TableCell>
                  <TableCell element={'td'} className="flex items-center gap-1">
                    <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                    <span>{invoice?.meta_asset_price ?? 'N/A'} US$</span>
                  </TableCell>
                  <TableCell element={'td'}>
                    {invoice?.date ? dayjs(invoice?.date).format('DD MMM YYYY') : 'N/A'}
                  </TableCell>
                  <TableCell element={'td'} className="flex items-center gap-1">
                    <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                    <span>
                      {invoice?.meta_asset_price != null && invoice?.quantity != null
                        ? invoice.meta_asset_price * invoice.quantity
                        : 'N/A'}{' '}
                      US$
                    </span>
                  </TableCell>
                  <TableCell element={'td'} className="text-center">
                    <button onClick={() => handleDownloadPDF(invoice)}>
                      <RiDownload2Fill className="size-5 h-5 w-5 text-white" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                element="tb"
                className="overflow-x-aut h-[72px] w-full !bg-light px-6 py-4 text-sm last:rounded-b-2xl"
              >
                <td colSpan={6}>
                  <div className="flex flex-col gap-4 py-10">
                    <ExclaimationIcon className="size-8 mx-auto shrink-0 cursor-pointer [&>path]:fill-white" />
                    <h3 className="text-center text-sm text-white">There is no invoices.</h3>
                  </div>
                </td>
              </TableRow>
            )}
            <tr>
              <td colSpan={6}>
                <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={isPrevDisabled(page)}
                    className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:opacity-50"
                  >
                    <HiMiniArrowLeft /> Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={isNextDisabled(page, totalPages)}
                    className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:opacity-50"
                  >
                    Next <HiMiniArrowRight />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="text-blue-shade-1 size-14 mx-auto mt-20 animate-spin" />
        </div>
      )}
    </div>
  );
};
