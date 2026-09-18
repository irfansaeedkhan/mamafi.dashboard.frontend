import React from 'react';
import ApexTimeChart from './apex-time-chart';
import HighValueTransactionsChart from './high-value-transaction-chart';
import SmallCardChart from './small-card-chart';

const VisualAnalytics = () => {
  return (
    <div className="w-full pb-20">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <ApexTimeChart
          title="User Growth"
          unitLabel="Users"
          seriesName="User Growth"
          yAxisMax={200}
          dataMap={{
            Daily: [50, 80, 100, 120, 150, 150],
            Weekly: [120, 140, 160, 100, 90, 60, 70],
            Monthly: [300, 400, 500, 350, 250],
          }}
        />

        <ApexTimeChart
          title="Asset Sales"
          unitLabel="USD"
          seriesName="Asset Sales"
          yAxisMax={10000}
          yAxisFormatter={val => `$${val.toLocaleString()}`}
          dataMap={{
            Daily: [2000, 2500, 3000, 3500, 4000, 4500],
            Weekly: [5000, 2500, 5200, 4000, 3800, 3600, 3000],
            Monthly: [3200, 4500, 5000, 4800, 4100],
          }}
        />

        <ApexTimeChart
          title="Transaction Success"
          unitLabel="Success"
          seriesName="Transaction Success"
          yAxisMax={2000}
          dataMap={{
            Daily: [500, 750, 1000, 1300, 1500, 1500],
            Weekly: [800, 1000, 1200, 1500, 1300, 1100, 1400],
            Monthly: [1200, 1500, 1800, 1700, 1600],
          }}
        />

        <ApexTimeChart
          title="Transaction Failed"
          unitLabel="Failed"
          seriesName="Transaction Failed"
          yAxisMax={2000}
          dataMap={{
            Daily: [600, 800, 1000, 1200, 1500, 723],
            Weekly: [1000, 800, 1100, 1200, 900, 750, 700],
            Monthly: [1000, 800, 1100, 1200, 723],
          }}
          lineColor="#FF294F"
        />

        <ApexTimeChart
          title="Reward Payed"
          unitLabel="USD"
          seriesName="Reward Payed"
          yAxisMax={10000}
          yAxisFormatter={val => `$${val.toLocaleString()}`}
          dataMap={{
            Daily: [2000, 3500, 5000, 6200, 7150, 7150],
            Weekly: [2000, 3000, 5000, 6000, 6500, 7000, 7150],
            Monthly: [4000, 5200, 6100, 6800, 7150],
          }}
        />

        <ApexTimeChart
          title="Deposits Volume"
          subtitle="Total withdrawals"
          unitLabel="USD"
          seriesName="Deposits"
          yAxisMax={100000}
          yAxisFormatter={val => `$${val.toLocaleString()}`}
          dataMap={{
            Daily: [10000, 20000, 30000, 40000, 50000, 60000],
            Weekly: [50000, 30000, 45000, 52000, 32000, 31000, 28000],
            Monthly: [50000, 30000, 45000, 52000, 32000],
          }}
        />

        <div className="flex flex-col gap-4">
          <ApexTimeChart
            title="Withdrawal Volumes"
            subtitle="Total withdrawals"
            unitLabel="USD"
            seriesName="Withdrawals"
            yAxisMax={100000}
            yAxisFormatter={val => `$${val.toLocaleString()}`}
            dataMap={{
              Daily: [25000, 40000, 60000, 72000, 80000, 32000],
              Weekly: [50000, 30000, 45000, 52000, 32000, 35000, 33000],
              Monthly: [50000, 30000, 45000, 52000, 32000],
            }}
          />

          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-3">
            <SmallCardChart
              title="New Tickets"
              textColor="#FF294F"
              lineColor="#FF294F"
              dataMap={{
                Daily: [12, 18, 30, 40, 55, 71],
                Weekly: [30, 28, 25, 40, 60, 65, 71],
                Monthly: [10, 20, 35, 50, 71],
              }}
            />

            <SmallCardChart
              title="Solved Tickets"
              textColor="gradient"
              lineColor="#FF294F"
              dataMap={{
                Daily: [10, 15, 18, 25, 30, 35],
                Weekly: [5, 10, 18, 25, 30, 33, 35],
                Monthly: [15, 22, 29, 33, 35],
              }}
            />

            <SmallCardChart
              title="Pending Tickets"
              textColor="#FFD46E"
              lineColor="#FFD46E"
              dataMap={{
                Daily: [8, 14, 20, 26, 32, 36],
                Weekly: [14, 17, 20, 25, 30, 33, 36],
                Monthly: [15, 20, 26, 31, 36],
              }}
            />
          </div>
        </div>

        <HighValueTransactionsChart
          values={[37500, 32000, 29000, 27000, 26000, 25000, 24000, 23000, 22000, 21000]}
        />
      </div>
    </div>
  );
};

export default VisualAnalytics;
