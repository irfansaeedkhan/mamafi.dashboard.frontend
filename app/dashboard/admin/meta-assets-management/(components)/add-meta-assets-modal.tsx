'use client';
import { AlertCircle, ChevronDown, ChevronUp, CircleX, Download, Search, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

import { Button } from '@/components/shared';
import {
  User,
  addUserMetaAsset,
  bulkUploadUserMetaAsset,
  searchUsers,
} from '@/lib/auth/admin';


interface AddSigillumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'manual' | 'bulk';

const AddSigillumModal: React.FC<AddSigillumModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('manual');
  const [formData, setFormData] = useState({
    userId: '',
    sigillumCount: '',
  });

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [uploadResults, setUploadResults] = useState<{
    successful: number;
    failed: number;
    results: Array<{ email: string; count: number; success: boolean; message: string }>;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUsers = useCallback(async (query: string = '') => {
    setLoading(true);
    try {
      const response = await searchUsers(query, 1, 20);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        userId: '',
        sigillumCount: '',
      });
      setActiveTab('manual');
      setShowUserDropdown(false);
      setSelectedUser(null);
      setSearchQuery('');
      setFileError(null);
      setExcelFile(null);
      setUploadResults(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      fetchUsers('');
    }
  }, [isOpen, fetchUsers]);

  useEffect(() => {
    if (!isOpen || !showUserDropdown) return;
    const timer = setTimeout(() => {
      fetchUsers(searchQuery.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, showUserDropdown, isOpen, fetchUsers]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'sigillumCount') {
      // Handle number input: allow empty or valid numbers, prevent leading zeros
      if (value === '' || value === '0') {
        setFormData(prev => ({ ...prev, [name]: '' }));
      } else {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 0) {
          setFormData(prev => ({ ...prev, [name]: String(numValue) }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleIncrement = () => {
    const current = parseInt(formData.sigillumCount) || 0;
    setFormData(prev => ({ ...prev, sigillumCount: String(current + 1) }));
  };

  const handleDecrement = () => {
    const current = parseInt(formData.sigillumCount) || 0;
    if (current > 1) {
      setFormData(prev => ({ ...prev, sigillumCount: String(current - 1) }));
    } else {
      setFormData(prev => ({ ...prev, sigillumCount: '' }));
    }
  };

  const handleUserSelect = (user: User) => {
    setFormData(prev => ({ ...prev, userId: user.id || '' }));
    setSelectedUser(user);
    setShowUserDropdown(false);
    setSearchQuery('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'manual') {
      if (!formData.userId || !formData.sigillumCount) {
        toast.error('Please fill in all required fields');
        return;
      }

      setSubmitting(true);
      try {
        await addUserMetaAsset({
          user_id: formData.userId,
          count: parseInt(formData.sigillumCount, 10),
        });
        toast.success('Meta asset added successfully');
        onClose();
      } catch (error: any) {
        toast.error(error.message || 'Failed to add meta asset');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBulkUpload = async () => {
    if (!excelFile) {
      toast.error('Please upload an Excel file');
      return;
    }

    setSubmitting(true);
    try {
      const response = await bulkUploadUserMetaAsset(excelFile);
      if (response.success) {
        // Store results to show detailed information
        setUploadResults({
          successful: response.successful,
          failed: response.failed,
          results: response.results.map(r => ({
            email: r.email,
            count: r.count,
            success: r.success,
            message: r.message,
          })),
        });

        // Show summary toast
        if (response.failed === 0) {
          toast.success(`All ${response.successful} records uploaded successfully!`);
          setTimeout(() => onClose(), 1500);
        } else {
          toast(
            `Upload completed: ${response.successful} successful, ${response.failed} failed. See details below.`,
            {
              icon: response.successful > 0 ? '✅' : '⚠️',
              duration: 4000,
            }
          );
        }
      } else {
        toast.error(response.message || 'Bulk upload failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload meta assets');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - only Excel files
    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setFileError('Please upload a valid Excel file (.xlsx or .xls)');
      setExcelFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setExcelFile(file);
    setFileError(null);
  };

  const handleDownloadTemplate = () => {
    // Instructional example data
    const data = [
      ['Email', 'Count'],
      ['user1@example.com', 10],
      ['user2@example.com', 25],
      ['user3@example.com', 15],
    ];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Optional: make it look professional
    worksheet['!cols'] = [
      { wch: 35 }, // Email column width
      { wch: 15 }, // Count column width
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    // Download Excel file
    XLSX.writeFile(workbook, 'sigillum-template.xlsx');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0EBF] backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-xl box-3d bg-dark p-6">
        <button onClick={onClose} className="hover:text-gray-300 absolute right-4 top-4 text-white">
          <CircleX size={24} />
        </button>

        <h2 className="text-gradient mb-6 text-2xl font-bold">Add Sigillum</h2>

        {/* Tabs */}
        <div className="mb-6 flex">
          <button
            type="button"
            onClick={() => {
              setActiveTab('manual');
              setFileError(null);
            }}
            className={`px-6 pb-3 text-sm font-medium transition-colors ${
              activeTab === 'manual'
                ? 'border-b-2 border-[#1C83FF] text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Manual Entry
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('bulk');
              setFileError(null);
            }}
            className={`px-6 pb-3 text-sm font-medium transition-colors ${
              activeTab === 'bulk'
                ? 'border-b-2 border-[#1C83FF] text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Bulk Upload
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'manual' ? (
            <div className="space-y-6 rounded-xl bg-light p-3">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* User ID Dropdown */}
                <div>
                  <p className="mb-2 text-sm text-white">User ID</p>
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex w-full items-center justify-between rounded-full bg-dark px-4 py-2.5 text-left text-sm text-white focus:outline-none box-3d"
                    >
                      <span className={selectedUser ? 'text-white' : 'text-gray-500'}>
                        {selectedUser
                          ? `${selectedUser.name || ''} ${selectedUser.surName || ''} (${selectedUser.email || selectedUser.id})`.trim()
                          : 'Select User ID'}
                      </span>
                      <ChevronDown size={18} className="text-white/80" />
                    </button>

                    {showUserDropdown && (
                      <div className="absolute z-10 mt-2 w-full rounded-xl border border-white/20 bg-light shadow-lg">
                        <div className="border-b border-white/10 p-2">
                          <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            <input
                              type="text"
                              placeholder="Search users..."
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              className="search-input-modal w-full rounded-lg bg-light px-10 py-2 text-sm focus:outline-none"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {loading ? (
                            <div className="p-4 text-center text-sm text-white/50">Loading users...</div>
                          ) : users.length > 0 ? (
                            users.map(user => (
                              <button
                                key={user.id}
                                type="button"
                                onClick={() => handleUserSelect(user)}
                                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10"
                              >
                                {`${user.name || ''} ${user.surName || ''} (${user.email || user.id})`.trim()}
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-sm text-white/50">No users found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sigillum Count */}
                <div>
                  <p className="mb-2 text-sm text-white">Sigillum Count</p>
                  <div className="relative">
                    <input
                      name="sigillumCount"
                      type="number"
                      value={formData.sigillumCount}
                      onChange={handleChange}
                      placeholder="Enter Count"
                      className="w-full rounded-full bg-dark box-3d px-4 py-2.5 pr-10 text-sm text-white placeholder:text-gray-500 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      min="0"
                      step="1"
                    />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col">
                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="flex h-3 w-4 items-center justify-center text-white/60 hover:text-white transition-colors"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="flex h-3 w-4 items-center justify-center text-white/60 hover:text-white transition-colors"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 rounded-xl bg-light p-3">
              {/* Instructions */}
              <div className="rounded-lg bg-dark/50 p-4">
                <h4 className="mb-2 text-sm font-semibold text-white">Instructions:</h4>
                <p className="text-sm leading-relaxed text-white/80">
                  Upload an Excel file (.xlsx or .xls) with columns: <span className="font-medium text-white">Email</span> and{' '}
                  <span className="font-medium text-white">Count</span>
                </p>
              </div>

              {/* File Upload */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  title="Upload"
                  variant="confirm"
                  size="sm"
                  compact
                  className="capitalize"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                />
                {excelFile && (
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-sm text-white/60">{excelFile.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setExcelFile(null);
                        setFileError(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="flex items-center justify-center rounded-full p-1 hover:bg-red-500/20 transition-colors"
                    >
                      <X size={14} className="text-red-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* Download Template */}
              <div>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-2 text-sm text-white hover:text-brand-mint transition-colors"
                >
                  <Download size={16} />
                  <span>Download Excel Template</span>
                </button>
                <p className="mt-1 text-xs text-white/50">
                  This template contains example data. Replace it with real values before uploading.
                </p>
              </div>

              {/* Error Message */}
              {fileError && (
                <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                  <p className="text-sm text-red-400">{fileError}</p>
                </div>
              )}

              {/* Upload Results */}
              {uploadResults && (
                <div className="rounded-lg border border-white/20 bg-dark/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Upload Results</h4>
                    <button
                      type="button"
                      onClick={() => setUploadResults(null)}
                      className="text-white/60 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mb-3 flex gap-4 text-sm">
                    <span className="text-green-400">
                      ✓ Successful: {uploadResults.successful}
                    </span>
                    <span className="text-red-400">
                      ✗ Failed: {uploadResults.failed}
                    </span>
                  </div>
                  <div className="max-h-60 space-y-2 overflow-y-auto">
                    {uploadResults.results.map((result, index) => (
                      <div
                        key={index}
                        className={`rounded border p-2 text-xs ${
                          result.success
                            ? 'border-green-500/30 bg-green-500/10'
                            : 'border-red-500/30 bg-red-500/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <span className={result.success ? 'text-green-400' : 'text-red-400'}>
                              {result.email}
                            </span>
                            <span className="ml-2 text-white/60">(Count: {result.count})</span>
                          </div>
                          <span className={result.success ? 'text-green-400' : 'text-red-400'}>
                            {result.success ? '✓' : '✗'}
                          </span>
                        </div>
                        {result.success ? (
                          <p className="mt-1 text-green-300">{result.message}</p>
                        ) : (
                          <p className="mt-1 text-red-300">{result.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  {uploadResults.failed === 0 && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        title="Close"
                        variant="confirm"
                        size="sm"
                        compact
                        className="capitalize"
                        type="button"
                        onClick={onClose}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button for Bulk Upload */}
              <div className="flex justify-end pt-4">
                <Button
                  title="Add"
                  variant="confirm"
                  size="lg"
                  compact
                  className="capitalize"
                  type="button"
                  onClick={handleBulkUpload}
                  disabled={!excelFile || !!fileError || submitting}
                />
              </div>
            </div>
          )}

          {/* Submit Button for Manual Entry */}
          {activeTab === 'manual' && (
            <div className="flex justify-end pt-4">
              <Button
                title="Add"
                variant="confirm"
                size="lg"
                compact
                className="capitalize"
                type="submit"
                disabled={submitting}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddSigillumModal;
