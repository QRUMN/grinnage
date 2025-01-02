import React from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface ScatterChartProps {
  data: any[];
  width?: number | string;
  height?: number | string;
  scatters: {
    data: any[];
    name: string;
    fill?: string;
  }[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function ScatterChart({
  width = '100%',
  height = 300,
  scatters,
  xAxisDataKey,
  yAxisDataKey,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}: ScatterChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsScatterChart margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxisDataKey}
          type="number"
          name={xAxisDataKey}
          unit=""
        />
        <YAxis
          dataKey={yAxisDataKey}
          type="number"
          name={yAxisDataKey}
          unit=""
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        {scatters.map((scatter, index) => (
          <Scatter
            key={index}
            name={scatter.name}
            data={scatter.data}
            fill={scatter.fill}
          />
        ))}
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
}
