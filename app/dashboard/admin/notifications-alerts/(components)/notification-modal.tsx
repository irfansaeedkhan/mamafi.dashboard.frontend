'use client';

import { SearchNormalIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { CircleX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Column, DataTableNew } from '../../admin_components/data-table';
import SingleCheckbox from '../../platform-monitoring/(components)/single-checkbox';

export type Notification = {
  id: string;
  date: string;
  title: string;
  text: string;
  type: string;
  targetUsers: string;
  targetType: string;
  status: 'Active' | 'Inactive' | 'Scheduled';
  urgency: 'Normal' | 'Important' | 'Urgent';
  readBy: number;
};

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification?: Notification | null;
}

const dummyUsers = Array.from({ length: 25 }).map((_, i) => ({
  userId: '12175688',
  username: 'John Doe',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  regDate: '12 JAN 2024',
  holdings: [12, 9, 5, 4, 2][i % 5],
  affiliates: [32, 5, 21, 13, 33][i % 5],
  status: ['Active', 'Inactive', 'Suspended', 'Blocked', 'Active'][i % 5],
  kyc: ['Approved', 'Rejected', 'ND', 'Approved', 'Rejected'][i % 5],
}));

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notification }) => {
  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState('');
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    'All users': false,
    'Assets holders': true,
    'KYC pending users': false,
    'Type 1': false,
    'Type 2': true,
    'Type 3': false,
    'Top Asset…': false,
    Period: false,
    'Affiliate/ Meta-Asset Earnings': true,
  });

  const handleCheckboxChange = (key: string, value: boolean) => {
    setCheckboxes(prev => ({ ...prev, [key]: value }));
  };

  const [form, setForm] = useState({
    id: '',
    title: '',
    text: '',
    type: 'System and Platform Updates',
    urgency: 'Normal',
  });

  useEffect(() => {
    if (notification) {
      setForm({
        id: notification.id,
        title: notification.title,
        text: notification.text,
        type: notification.type,
        urgency: notification.urgency,
      });
    } else {
      setForm({
        id: 'Auto-generated',
        title: '',
        text: '',
        type: 'System and Platform Updates',
        urgency: 'Normal',
      });
    }
    setStep(0);
  }, [notification, isOpen]);

  if (!isOpen) return null;

  const filteredUsers = dummyUsers.filter(u =>
    `${u.username} ${u.email} ${u.userId}`.toLowerCase().includes(filter.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      key: 'select',
      header: '',
      renderCell: () => <input type="checkbox" className="accent-green" />,
    },
    { key: 'userId', header: 'User ID', accessor: 'userId' },
    { key: 'username', header: 'Username', accessor: 'username' },
    { key: 'name', header: 'Name and Surname', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'regDate', header: 'Registration date', accessor: 'regDate' },
    { key: 'holdings', header: 'Asset holdings', accessor: 'meta_assets_count' },
    {
      key: 'affiliates',
      header: 'Number of affiliates',
      accessor: 'affiliates',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      renderCell: u => (
        <span
          className={
            u.status === 'Active'
              ? 'text-brand-mint'
              : u.status === 'Inactive'
                ? 'text-white'
                : 'text-brand-red'
          }
        >
          {u.status}
        </span>
      ),
    },
    {
      key: 'kyc',
      header: 'KYC Status',
      renderCell: u => (
        <span
          className={
            u.kyc === 'Approved'
              ? 'text-brand-mint'
              : u.kyc === 'Rejected'
                ? 'text-brand-red'
                : 'text-white'
          }
        >
          {u.kyc}
        </span>
      ),
    },
  ];

  const dummyLogUsers = [
    { name: 'John Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'Jame Doe', read: 'No', date: '12 JAN 2024' },
    { name: 'Smith Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'John Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'Jame Doe', read: 'No', date: '12 JAN 2024' },
    { name: 'Smith Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'John Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'Jame Doe', read: 'No', date: '12 JAN 2024' },
    { name: 'Smith Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'John Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'Jame Doe', read: 'No', date: '12 JAN 2024' },
    { name: 'Smith Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'John Doe', read: 'Yes', date: '12 JAN 2024' },
    { name: 'Jame Doe', read: 'No', date: '12 JAN 2024' },
    { name: 'Smith Doe', read: 'Yes', date: '12 JAN 2024' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0EBF] backdrop-blur-sm">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-6xl rounded-xl box-3d bg-dark text-white">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-gradient text-2xl font-bold">
              {notification ? 'Edit Notification' : 'Send Notification'}
            </h2>
            <button onClick={onClose} className="text-white">
              <CircleX size={24} />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-evenly gap-6 pb-2">
            {['Notification Info', 'Target Users', 'Publication'].map((t, i) => (
              <button
                key={t}
                onClick={() => setStep(i)}
                className={`text-sm ${step === i ? 'font-semibold text-brand-mint' : 'text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-6 rounded-xl bg-light p-6 text-sm">
              <div className="flex gap-4 border-b border-[#0E1F30] pb-4">
                <p>Notification ID</p>
                <p className="text-brand-mint">{form.id}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="mb-1 block">Notification Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter Title"
                    className="w-full rounded bg-light p-2 text-sm placeholder-gradient"
                  />
                </div>
                <div className="w-1/2">
                  <label className="mb-1 block">Notification Text</label>
                  <input
                    type="text"
                    value={form.text}
                    onChange={e => setForm({ ...form, text: e.target.value })}
                    placeholder="Enter Text"
                    className="w-full rounded bg-light p-2 text-sm placeholder-gradient"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="mb-1 block">Notification Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded bg-light p-2 text-white"
                  >
                    <option>System and Platform Updates</option>
                    <option>News & Updates</option>
                    <option>Assets Info</option>
                    <option>Rewards</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="mb-1 block">Urgency Level</label>
                  <select
                    value={form.urgency}
                    onChange={e => setForm({ ...form, urgency: e.target.value })}
                    className="w-full rounded bg-light p-2 text-white"
                  >
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  title="Next"
                  variant="confirm"
                  size="sm"
                  compact
                  className="capitalize"
                  onClick={() => setStep(1)}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 rounded-xl bg-light p-6 text-sm">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="box flex flex-col items-start gap-6">
                  {['All users', 'KYC pending users'].map(label => (
                    <SingleCheckbox
                      key={label}
                      checked={checkboxes[label]}
                      onChange={val => handleCheckboxChange(label, val)}
                      label={label}
                    />
                  ))}
                </div>
                <div className="box flex flex-col items-start gap-6">
                  {['Assets holders'].map(label => (
                    <SingleCheckbox
                      key={label}
                      checked={checkboxes[label]}
                      onChange={val => handleCheckboxChange(label, val)}
                      label={label}
                    />
                  ))}
                  <div className="children ml-5 grid grid-cols-2 gap-4">
                    {/* <SingleCheckbox
                      checked={checkboxes["KYC pending users"]}
                      onChange={(val) =>
                        handleCheckboxChange("KYC pending users", val)
                      }
                      label="KYC pending users"
                    /> */}
                    {['Type 1', 'Type 2', 'Type 3', 'Top Asset…'].map(label => (
                      <SingleCheckbox
                        key={label}
                        checked={checkboxes[label]}
                        onChange={val => handleCheckboxChange(label, val)}
                        label={label}
                      />
                    ))}
                  </div>
                </div>
                <div className="box flex flex-col items-start gap-6">
                  {['Reward Earners'].map(label => (
                    <SingleCheckbox
                      key={label}
                      checked={checkboxes[label]}
                      onChange={val => handleCheckboxChange(label, val)}
                      label={label}
                    />
                  ))}
                  <div className="children ml-5 flex flex-col gap-4">
                    {['Period', 'Type: Affiliate/ Meta-Asset Earnings'].map(label => (
                      <SingleCheckbox
                        key={label}
                        checked={checkboxes[label]}
                        onChange={val => handleCheckboxChange(label, val)}
                        label={label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <h3 className="text-sm font-semibold">List of Users involved</h3>
                <div className="relative w-1/3">
                  <input
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Search by email, username, userID"
                    className="search-input-modal w-full rounded-full box-3d bg-light px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff294f]"
                  />
                  <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <DataTableNew
                columns={columns}
                data={filteredUsers}
                pageSize={5}
                theadBg="bg-light"
                tbodyBg="bg-light"
                footerBg="bg-light"
                hoverBg="hover:bg-dark"
              />
              <div className="flex justify-between">
                <Button
                  title="Previous"
                  variant="confirm"
                  size="sm"
                  compact
                  className="capitalize"
                  onClick={() => setStep(0)}
                />
                <Button
                  title="Next"
                  variant="confirm"
                  size="sm"
                  compact
                  className="capitalize"
                  onClick={() => setStep(2)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 rounded-xl p-6 text-sm bg-light">
              {/* Publish & Status */}
              <div className="flex w-full flex-col rounded-lg">
                <div className="flex w-full items-center justify-between gap-8 p-4">
                  <div className="w-[30%]"></div>
                  <div className="flex w-[50%] items-center gap-20">
                    <SingleCheckbox checked={true} onChange={() => {}} label="Publish Now" />
                    <SingleCheckbox checked={false} onChange={() => {}} label="Schedule" />
                  </div>
                  <div className="flex w-[15%] justify-end">
                    <Button
                      title="Publish"
                      variant="confirm"
                      size="sm"
                      compact
                      className="capitalize"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-8 p-4">
                  <div className="w-[30%]">
                    <p className="text-sm text-white">Status</p>
                  </div>
                  <div className="flex w-[50%] items-center gap-20">
                    <SingleCheckbox checked={true} onChange={() => {}} label="Active" />
                    <SingleCheckbox checked={false} onChange={() => {}} label="Inactive" />
                  </div>
                  <div className="flex w-[15%] justify-end">
                    <Button
                      title="Update Status"
                      variant="confirm"
                      size="sm"
                      compact
                      className="capitalize"
                    />
                  </div>
                </div>
              </div>

              {/* Log Info */}
              <h5 className="pt-6 text-sm  text-white">Log Activity</h5>
              <div className="grid grid-cols-3 gap-8 text-xs">
                <div>
                  <p className="mb-1 text-sm text-white">Created on</p>
                  <p>12 JAN 2024</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-white">Released on</p>
                  <p>12 JAN 2024</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-white">Suspended on</p>
                  <p>12 JAN 2024</p>
                </div>
              </div>

              {/* Target Users List */}
              <div>
                <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full  max-h-40 overflow-y-auto rounded p-3 scrollbar-thin scrollbar-track-dark scrollbar-thumb-[#287ef6]">
                  <table className="w-full text-left text-xs">
                    <thead className="w-full  text-white">
                      <tr className="w-full p-4">
                        <th className="p-4">Target Users list </th>
                        <th className="p-4">Read</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyLogUsers.map((u, i) => (
                        <tr key={i} className="w-full text-white">
                          <td className="px-4 py-2">{u.name}</td>
                          <td className="px-4 py-2">{u.read}</td>
                          <td className="px-4 py-2">{u.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  title="Export Log As PDF"
                  variant="confirm"
                  size="sm"
                  compact
                  className="capitalize"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
