'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { CalendarIconGradient, ETHIcon, SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { AllUsersReportResponse, User, getAllUsersReport, getUsers } from '@/lib/auth/admin';
import { formatNumber } from '@/utils/format-numbers-dash';
import { CgSpinner } from 'react-icons/cg';
import Calendar from '../../admin_components/calender';
import { Column, DataTableNew } from '../../admin_components/data-table';
import { useNumberFormatter } from '../../admin_components/use-number-formatter';
import DemoProfileModal from './demo-profile-modal';
import ViewProfileModal from './viewprofile-modal';

export type ManagementUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  registrationDate: string;
  assetHoldings: number;
  affiliates: number;
  AffiliateStatus: 'Yes' | 'No';
  status: 'Active' | 'Suspended' | 'Inactive' | 'Blocked';
  kycStatus: 'Approved' | 'Need Information';
  lastLogin: string;
  avatarUrl: string;
  country: string;
  phone: string;
  ip: string;
  referral: string;
  is_demo: boolean;
  is_admin: boolean;
  is_rewards_enabled: boolean;
  meta_assets_count: number;
  noOfAffiliates: number;
};

export default function UserManagement() {
  const [filterText, setFilterText] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalUser, setModalUser] = useState<ManagementUser | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);
  const format = useNumberFormatter();
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [reportData, setReportData] = useState<AllUsersReportResponse | null>(null);
  const [reportLoading, setReportLoading] = useState(false);

  // Fetch employees from API
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers(page, perPage);

      setUsers(response.data);
      setTotalCount(response.count);
    } catch (error) {
      console.error('❌ Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  // Fetch report data
  const fetchReportData = useCallback(async () => {
    setReportLoading(true);
    try {
      const response = await getAllUsersReport();
      setReportData(response);
    } catch (error) {
      console.error('❌ Failed to fetch report data:', error);
    } finally {
      setReportLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchReportData();
  }, [fetchEmployees, fetchReportData]);

  // Convert API employees to ManagementUser format
  const mappedUsers: ManagementUser[] = users.map(user => ({
    id: user.id,
    username: user.email?.split('@')[0] || 'N/A',
    name: `${user.name || 'N/A'} ${user.surName || ''}`.trim(),
    email: user.email || 'N/A',
    registrationDate: user.createdAt ? dayjs(user.createdAt).format('DD MMM YYYY') : 'N/A',
    assetHoldings: 0, // Not available in API
    affiliates: 0, // Not available in API
    AffiliateStatus: user.is_rewards_enabled ? 'Yes' : 'No',
    status: user.hasBeenBlocked ? 'Blocked' : user.emailVerified ? 'Active' : 'Inactive',
    kycStatus: 'Need Information', // Not available in API
    lastLogin: user.lastLoginAt ? dayjs(user.lastLoginAt).format('DD MMM YYYY') : 'N/A',
    avatarUrl: '',
    country: user.countryCode || 'N/A',
    phone: user.mobile || 'N/A',
    ip: user.lastLoginIp || 'N/A',
    referral: user.referredBy || 'N/A',
    is_demo: user.is_demo,
    is_admin: user.is_admin,
    is_rewards_enabled: user.is_rewards_enabled,
    meta_assets_count: user.meta_assets_count,
    noOfAffiliates: user.noOfAffiliates,
  }));

  const tokens = filterText.toLowerCase().split(/\s+/).filter(Boolean);

  const filtered = mappedUsers.filter(u => {
    const haystack = `${u.username} ${u.email} ${u.id}`.toLowerCase();
    const textMatch = filterText
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .every(tok => haystack.includes(tok));

    let dateMatch = true;
    if (selectedDate) {
      const pick = dayjs(selectedDate).format('DD MMM YYYY').toUpperCase();
      dateMatch = u.registrationDate.toUpperCase() === pick;
    }

    return textMatch && dateMatch;
  });

  const handleToggleStatus = (u: ManagementUser) => {
    // add logic to toggle user status

    return 0;
  };

  // Calculate total pages from API count
  const totalPages = Math.ceil(totalCount / perPage) || 1;

  const columns: Column<ManagementUser>[] = [
    { key: 'id', header: 'Users ID', accessor: 'id' },
    { key: 'username', header: 'Users Name', accessor: 'username' },
    { key: 'name', header: 'Name & Surname', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },

    {
      key: 'registrationDate',
      header: 'Registration date',
      accessor: 'registrationDate',
      sortable: true,
    },
    {
      key: 'assetHoldings',
      header: 'Asset holdings',
      accessor: 'assetHoldings',
      sortable: true,
      renderCell: u => <span>{format(u.meta_assets_count)}</span>,
    },
    {
      key: 'noOfAffiliates',
      header: 'Number of affiliates',
      accessor: 'noOfAffiliates',
      sortable: true,
      renderCell: u => <span>{format(u.noOfAffiliates)}</span>,

    },

    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      filterOptions: ['Active', 'Suspended', 'Inactive', 'Blocked'],
      renderCell: u => {
        const color =
          u.status === 'Active'
            ? 'text-brand-mint'
            : u.status === 'Suspended'
              ? 'text-brand-orange'
              : u.status === 'Inactive'
                ? 'text-white'
                : u.status === 'Blocked'
                  ? 'text-brand-red'
                  : 'text-white';
        return <span className={color}>{u.status}</span>;
      },
    },
    {
      key: 'kycStatus',
      header: 'KYC status',
      accessor: 'kycStatus',
      filterOptions: ['Approved', 'Need Information'],
      renderCell: u => (
        <span className={u.kycStatus === 'Approved' ? 'text-brand-mint' : 'text-white/80'}>
          {u.kycStatus}
        </span>
      ),
    },
    { key: 'lastLogin', header: 'Last Login', accessor: 'lastLogin' },
    {
      key: 'AffiliateStatus',
      header: 'Affiliate status',
      accessor: 'AffiliateStatus',
      filterOptions: ['Yes', 'No'],
      renderCell: u => (
        <span className={u.AffiliateStatus === 'Yes' ? 'text-brand-mint' : 'text-brand-red'}>
          {u.AffiliateStatus}
        </span>
      ),
    },
    {
      key: 'is_demo',
      header: 'Demo Account',
      renderCell: u => (
        <span className={u.is_demo ? 'text-brand-mint' : 'text-brand-red'}>
          {u.is_demo ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'is_rewards_enabled',
      header: 'Rewards',
      renderCell: u => (
        <span className={u.is_rewards_enabled ? 'text-brand-mint' : 'text-brand-red'}>
          {u.is_rewards_enabled ? 'Enabled' : 'Disabled'}
        </span>
      ),
    },

    {
      key: 'actions',
      header: 'Actions',
      renderCell: u => (
        <div className="flex flex-col items-center gap-2">
          <Button
            title="View Profile"
            variant="confirm"
            size="sm"
            compact
            onClick={() => setModalUser(u)}
            className="w-full capitalize"
          />
          {u.status === 'Suspended' || u.status === 'Inactive' || u.status === 'Blocked' ? (
            <Button
              title="Restore"
              variant="confirm"
              size="sm"
              compact
              onClick={() => handleToggleStatus(u)}
              className="w-full capitalize"
            />
          ) : (
            <Button
              title="Suspend"
              variant="confirm-danger"
              size="sm"
              compact
              onClick={() => handleToggleStatus(u)}
              className="w-full capitalize"
            />
          )}
        </div>
      ),
    },
  ];

  const toggleCalendar = () => setShowDatePicker(v => !v);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setPage(1);
    setShowDatePicker(false);
  };

  const openCalendar = () => setShowDatePicker(true);
  const closeCalendar = () => setShowDatePicker(false);

  // if (loading) {
  //   return (
  //     <div className="flex h-[50vh] items-center justify-center">
  //       <CgSpinner className="size-14 animate-spin text-white" />
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-full space-y-6 overflow-hidden">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <CgSpinner className="size-12 animate-spin text-brand-mint" />
            <span className="text-sm text-white">Loading users...</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 lg:justify-between xl:flex-row xl:items-center">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-gradient text-2xl font-bold">User Management</h1>
            <p className="text-sm text-white">
              Manage and track user profiles, KYC status, assets, and affiliate activities.
            </p>
          <Button
            title="Add DEMO account"
            variant="confirm"
            size="lg"
            compact
            className="capitalize"
              onClick={() => setIsDemoModalOpen(true)}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by email, username, userID"
              value={filterText}
              onChange={e => {
                setFilterText(e.target.value);
              }}
              className="search-input xl:min-w-96 w-full rounded-full box-3d bg-dark py-3 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
            />
            <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white" />
          </div>

          {/* Date picker */}
          <div ref={dateRef} className="relative z-20 overflow-visible rounded-lg">
            <button
              onClick={toggleCalendar}
              className="flex shrink-0 items-center justify-between gap-5  border px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg box-3d"
            >
              {selectedDate ? dayjs(selectedDate).format('DD MMM YYYY') : 'Date'}
              <CalendarIconGradient className="shrink-0" />
            </button>

            {showDatePicker && (
              <Calendar
                defaultDate={selectedDate || undefined}
                onDateSelect={handleDateSelect}
                onCancel={closeCalendar}
                onConfirm={handleDateConfirm}
                makeBlurBackground={true}
              />
            )}
          </div>

          {selectedDate && (
            <button
              onClick={() => {
                setSelectedDate(null);
              }}
              className="rounded-full bg-brand-red px-3 py-2 text-sm text-white hover:bg-red-500"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-xl box-3d p-6">
          <div className="mb-2 text-sm font-medium text-white/70">Total Deposits</div>
          {reportLoading ? (
            <div className="flex items-center justify-start">
              <CgSpinner className="size-6 h-6 w-6 shrink-0 animate-spin text-white" />
            </div>
          ) : reportData?.totalDepositeAmounts !== undefined &&
            reportData?.totalDepositeAmountsInUSD !== undefined ? (
            <div className="flex items-center justify-start gap-2 text-2xl text-white">
              <ETHIcon className="size-6  mt-[-1px] h-6 w-6 shrink-0 text-center" />
              <span className="flex items-center justify-center">
                {Math.abs(reportData.totalDepositeAmounts).toFixed(2)}
                <span className="ml-1 mt-2 text-center text-sm"> ETH</span>
              </span>
              <span className="mt-1.5 flex items-center justify-center text-sm text-white">
                <span className="mr-1 text-sm">(</span>~
                {formatNumber(Math.abs(reportData.totalDepositeAmountsInUSD))}
                <span className="ml-1 text-center text-sm"> USD </span>
                <span className="ml-1">)</span>
              </span>
            </div>
          ) : (
            <div className="text-2xl font-bold text-white">N/A</div>
          )}
        </div>

        {/* Total Users Card */}
        <div className="rounded-xl box-3d p-6">
          <div className="mb-2 text-sm font-medium text-white/70">Total Users</div>
          <div className="text-2xl font-bold text-white">
            {reportLoading ? (
              <CgSpinner className="size-6  inline-block h-6 w-6 shrink-0 animate-spin" />
            ) : reportData?.allUsersCount !== undefined ? (
              format(reportData.allUsersCount)
            ) : (
              'N/A'
            )}
          </div>
        </div>
      </div>

      <DataTableNew
        columns={columns}
        data={filtered}
        pageSize={perPage}
        headerHeight={100}
        extraPadding={100}
        externalPagination={{
          currentPage: page,
          totalPages: totalPages,
          onPageChange: setPage,
        }}
      />

      {modalUser && (
        <ViewProfileModal
          user={modalUser}
          onClose={() => setModalUser(null)}
          onUserUpdate={() => {
            // Refresh data when modal closes after changes
            fetchEmployees();
          }}
        />
      )}

      <DemoProfileModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSuccess={() => {
          // Refresh the user list and reset to page 1
          setPage(1);
          fetchEmployees();
        }}
      />
    </div>
  );
}
