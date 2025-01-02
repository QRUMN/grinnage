import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface BarChartProps {
  data: any[];
  width?: number | string;
  height?: number | string;
  bars: {
    dataKey: string;
    fill?: string;
    name?: string;
  }[];
  xAxisDataKey: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function BarChart({
  data,
  width = '100%',
  height = 300,
  bars,
  xAxisDataKey,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}: BarChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.fill}
            name={bar.name || bar.dataKey}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
