import React from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface AreaChartProps {
  data: any[];
  width?: number | string;
  height?: number | string;
  areas: {
    dataKey: string;
    stroke?: string;
    fill?: string;
    name?: string;
  }[];
  xAxisDataKey: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function AreaChart({
  data,
  width = '100%',
  height = 300,
  areas,
  xAxisDataKey,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}: AreaChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsAreaChart
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {areas.map((area, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={area.dataKey}
            stroke={area.stroke}
            fill={area.fill}
            name={area.name || area.dataKey}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
