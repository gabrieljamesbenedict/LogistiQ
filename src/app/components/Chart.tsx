'use client'
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface DataPoint{
  name: ExpenseType;
  value: number;
}

//misc, maintenance, fuel, tolls, salary
export enum ExpenseType {
  MISC = 'Misc',
  MAINTENANCE = 'Maintenance',
  FUEL = 'Fuel',
  TOLLS = 'Tolls',
  SALARY = 'Salary'
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

interface ChartCardProps {
  data: DataPoint[];
}

export default function ChartCard({ data }: ChartCardProps) {
  const dataFormatted = data.map((item, index) => ({
    ...item, fill: COLORS[index]
  }));
  return(
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <PieChart margin={{top:30,right:30,bottom:30,left:30}}>
        <Pie
          data={dataFormatted}
          cx = "50%"
          cy = "50%"
          outerRadius={100}
          dataKey="value"
          label>
        </Pie>
        <Tooltip/>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}