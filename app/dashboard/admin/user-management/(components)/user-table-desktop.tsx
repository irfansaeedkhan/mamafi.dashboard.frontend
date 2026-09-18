import { Button } from '@/components/shared';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import { ManagementUser } from './user-management';

interface Props {
  data: ManagementUser[];
  page: number;
  onPrev(): void;
  onNext(): void;
  onViewProfile(u: ManagementUser): void;
  onToggleStatus(u: ManagementUser): void;
}

export default function UserTableDesktop({
  data,
  page,
  onPrev,
  onNext,
  onViewProfile,
  onToggleStatus,
}: Props) {
  return (
    <div className="w-full rounded-xl bg-light">
      <div className="max-h-[70dvh] max-w-[1200px] overflow-auto rounded-tl-2xl rounded-tr-2xl">
        <table
          className="w-full text-[10px] text-white
            [@media(min-width:1440px)]:text-[12px]
            [@media(min-width:1680px)]:text-[14px]
          "
        >
          <thead className="bg-light">
            <tr>
              {[
                'Users ID',
                'Users Name',
                'Name and Surname',
                'Email',
                'Registration date',
                'Asset holdings',
                'Number of affiliates',
                'Status',
                'KYC status',
                'Last Login',
                'Actions',
              ].map(h => (
                <th key={h} className="max-w-[18ch] px-4 py-3 text-center font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-light">
            {data.length > 0 ? (
              data.map(u => (
                <tr
                  key={u.id}
                  className="cursor-pointer border-b border-[#142637] hover:bg-[#1A2A3B]"
                >
                  <td className=" p-2 text-center">{u.id}</td>
                  <td className="p-2 text-center">{u.username}</td>
                  <td className="p-2 text-center">{u.name}</td>
                  <td className="p-2 text-center">{u.email}</td>
                  <td className="p-2 text-center">{u.registrationDate}</td>
                  <td className="p-2 text-center">{u.assetHoldings}</td>
                  <td className="p-2 text-center">{u.affiliates}</td>
                  <td
                    className={`p-2 text-center font-semibold ${
                      u.status === 'Active'
                        ? 'text-brand-mint-400'
                        : u.status === 'Suspended'
                          ? 'text-brand-orange'
                          : u.status === 'Inactive'
                            ? 'text-blue-400'
                            : 'text-brand-red'
                    }`}
                  >
                    {u.status}
                  </td>
                  <td
                    className={`p-2 text-center ${
                      u.kycStatus === 'Approved' ? 'text-brand-mint-400' : 'text-yellow-300'
                    }`}
                  >
                    {u.kycStatus}
                  </td>
                  <td className="p-2 text-center">{u.lastLogin}</td>
                  <td className="p-2 text-center">
                    <div className="flex flex-col justify-center gap-2">
                      <Button
                        title="View Profile"
                        variant="confirm"
                        size="sm"
                        compact
                        onClick={() => onViewProfile(u)}
                        className="w-full sm:w-auto"
                      />
                      {u.status === 'Suspended' ||
                      u.status === 'Inactive' ||
                      u.status === 'Blocked' ? (
                        <Button
                          title="Restore"
                          variant="confirm"
                          size="sm"
                          compact
                          onClick={() => onToggleStatus(u)}
                          className="w-full sm:w-auto"
                        />
                      ) : (
                        <Button
                          title="Suspend"
                          variant="confirm-danger"
                          size="sm"
                          compact
                          onClick={() => onToggleStatus(u)}
                          className="w-full sm:w-auto"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-gray-500 p-8 text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-end gap-2 rounded-bl-2xl rounded-br-2xl bg-light p-4">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="flex items-center gap-1 rounded-lg bg-light px-4 py-2 text-white disabled:opacity-50"
        >
          <HiMiniArrowLeft /> Previous
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-1 rounded-lg bg-light px-4 py-2 text-white"
        >
          Next <HiMiniArrowRight />
        </button>
      </div>
    </div>
  );
}
