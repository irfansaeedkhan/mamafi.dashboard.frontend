// rawData.ts
export type ChartDataPoint = {
  date: string; // e.g., "2025-05-18"
  hour?: number; // only for daily/hourly view
  value: number;
};

export const rawData: ChartDataPoint[] = [
  // Daily (today - hourly)
  { date: '2025-05-18', hour: 0, value: 20 },
  { date: '2025-05-18', hour: 4, value: 40 },
  { date: '2025-05-18', hour: 8, value: 80 },
  { date: '2025-05-18', hour: 12, value: 100 },
  { date: '2025-05-18', hour: 16, value: 150 },
  { date: '2025-05-18', hour: 23, value: 130 },

  // Weekly (Sun to Sat - date only)
  { date: '2025-05-12', value: 100 }, // Mon
  { date: '2025-05-13', value: 150 },
  { date: '2025-05-14', value: 200 },
  { date: '2025-05-15', value: 250 },
  { date: '2025-05-16', value: 100 },
  { date: '2025-05-17', value: 150 },
  { date: '2025-05-18', value: 190 }, // Today

  // Monthly
  { date: '2025-05-01', value: 100 },
  { date: '2025-05-02', value: 120 },
  { date: '2025-05-03', value: 140 },
  { date: '2025-05-04', value: 160 },
  { date: '2025-05-05', value: 180 },
  { date: '2025-05-06', value: 200 },
];
