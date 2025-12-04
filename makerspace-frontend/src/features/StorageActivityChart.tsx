import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import type { FC } from 'react';

type SeriesPoint = { name: string; value: number };

type ActivityChartProps = {
  series?: SeriesPoint[];
};

const defaultData: SeriesPoint[] = [
  { name: 'Monday', value: 400 },
  { name: 'Tuesday', value: 300 },
  { name: 'Wednesday', value: 300 },
  { name: 'Thursday', value: 200 },
  { name: 'Friday', value: 278 },
  { name: 'Saturday', value: 189 },
];

export const ActivityChart: FC<ActivityChartProps> = ({ series }) => {
  const chartData = series && series.length ? series : defaultData;

  return (
    <ResponsiveContainer width="100%" aspect={1.618} maxHeight={400}>
      <LineChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
