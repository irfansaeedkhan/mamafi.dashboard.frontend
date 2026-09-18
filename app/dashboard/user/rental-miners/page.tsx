'use client';

import MinerChartBox from '@/components/rental-miners/miner-chart-box';

const RentalMiners = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
      <div className="miner-box relative z-0 mx-auto min-h-dvh w-full pb-10">
        <MinerChartBox bucketId="Miner_153F407D" minerName="153F407D" officeSize="Large Sigillum" />
      </div>
    </section>
  );
};

export default RentalMiners;
