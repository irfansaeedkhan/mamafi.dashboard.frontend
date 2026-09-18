import { CircleChevronRight } from 'lucide-react';

interface TransactionStat {
  label: string;
  deposits: string;
  withdrawals: string;
}

interface TrackingCardProps {
  transactionStats?: TransactionStat[];
  className?: string;
}

const TrackingCard: React.FC<TrackingCardProps> = ({
  transactionStats = [
    { label: 'Track Daily', deposits: '$ 51,340', withdrawals: '$ 23,100' },
    { label: 'Track Weekly', deposits: '$ 51,340', withdrawals: '$ 23,100' },
    { label: 'Track Monthly', deposits: '$ 51,340', withdrawals: '$ 23,100' },
  ],
  className = '',
}) => {
  return (
    <div
      className={`flex items-baseline rounded-xl box-3d p-6 text-xs ${className}`}
    >
      <div className="w-full">
        <div className="mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <button className="text-white text-base">Track daily</button>
            <button className="text-white ml-1 pb-1 text-base">Track Weekly</button>
            <button className="text-white ml-2 pb-1 text-base">Track Monthly</button>
          </div>
        </div>

        {/* Track Transactions */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {transactionStats.map((item, index) => (
            <div key={index} className="space-y-4 rounded-lg bg-light text-sm">
              <div className="p-4">
                <div className="text-xs text-white">Deposits</div>
                <div className="text-xs font-semibold text-brand-mint">{item.deposits}</div>
              </div>
              <div className="p-4">
                <div className="text-xs text-white">Withdrawals</div>
                <div className="text-xs font-semibold text-[#FF3D3D]">{item.withdrawals}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="ml-4 flex max-w-max shrink-0 self-end text-xs text-white">
        See Detail
        <CircleChevronRight className="ml-2 h-3 w-3" />
      </button>
    </div>
  );
};

export default TrackingCard;
