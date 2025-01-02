import React from 'react';
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface LineChartProps {
  data: any[];
  width?: number | string;
  height?: number | string;
  lines: {
    dataKey: string;
    stroke?: string;
    name?: string;
  }[];
  xAxisDataKey: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function LineChart({
  data,
  width = '100%',
  height = 300,
  lines,
  xAxisDataKey,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}: LineChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            name={line.name || line.dataKey}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
