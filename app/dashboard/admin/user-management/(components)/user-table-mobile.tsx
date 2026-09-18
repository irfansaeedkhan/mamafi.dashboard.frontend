import { Button } from '@/components/shared';
import { HiMiniArrowLeft, HiMiniArrowRight } from 'react-icons/hi2';
import { ManagementUser } from './user-management';

interface Props {
  data: ManagementUser[];
  page: number;
  onPrev(): void;
  onNext(): void;
  onViewProfile(user: ManagementUser): void;
}

export default function UserTableMobile({ data, page, onPrev, onNext, onViewProfile }: Props) {
  return (
    <div className="space-y-4">
      {data.length > 0 ? (
        data.map(u => (
          <div key={u.id} className="flex flex-col gap-3 rounded-xl bg-dark p-4 text-white">
            <div className="flex justify-between">
              <span className="font-medium">Full Name</span>
              <span>{u.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span>{u.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Assets</span>
              <span>{u.assetHoldings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Status</span>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  u.status === 'Active'
                    ? 'bg-green-500'
                    : u.status === 'Suspended'
                      ? 'bg-orange-500'
                      : u.status === 'Inactive'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                } text-white`}
              >
                {u.status}
              </span>
            </div>
            <Button
              title="View Profile"
              variant="confirm"
              size="sm"
              className="w-full"
              onClick={() => onViewProfile(u)}
            />
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-white">No records found</div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-dark px-4 py-2 text-white disabled:opacity-50"
        >
          <HiMiniArrowLeft /> Previous
        </button>
        <button
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-dark px-4 py-2 text-white"
        >
          Next <HiMiniArrowRight />
        </button>
      </div>
    </div>
  );
}
