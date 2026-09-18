import { AlertTransactionIcon } from '@/assets/svgs';
import { CircleChevronRight } from 'lucide-react';

interface Alert {
  id: string;
  message: string;
}

interface AlertsCardProps {
  alerts?: Alert[];
  className?: string;
}

const AlertsCard: React.FC<AlertsCardProps> = ({
  alerts = [
    { id: '1', message: 'John Doe has a failure for transaction, please check it out what' },
    { id: '2', message: 'Your balance is low under $10,000. Please deposit to your' },
    { id: '3', message: 'John Doe has a failure for transaction, please check it out what' },
    { id: '4', message: 'Your balance is low under $10,000. Please deposit to your' },
    { id: '5', message: 'John Doe has a failure for transaction, please check it out what' },
    { id: '6', message: 'Your balance is low under $10,000. Please deposit to your' },
  ],
  className = '',
}) => {
  return (
    <div className={`flex rounded-[20px] box-3d p-4 ${className}`}>
      <div className="mr-4 rounded-full">
        <AlertTransactionIcon />
      </div>
      <div className="flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm text-white">Alert</h2>
          <button className="flex text-xs text-white">
            See All
            <CircleChevronRight className="ml-2 h-3 w-3" />
          </button>
        </div>
        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-[5rem] overflow-y-auto rounded-xl bg-light p-2 text-xs scrollbar-thin scrollbar-track-[#0A1E2F] scrollbar-thumb-[#287ef6]">
          {alerts.map((alert, index) => (
            <p
              key={alert.id}
              className={`text-white ${index > 0 ? 'mt-2' : ''} ${index % 2 === 0 ? 'pb-2' : ''}`}
            >
              {alert.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsCard;
