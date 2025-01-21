"use client";

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Product A", sales: 4000, revenue: 2400 },
  { name: "Product B", sales: 3000, revenue: 1398 },
  { name: "Product C", sales: 2000, revenue: 9800 },
  { name: "Product D", sales: 2780, revenue: 3908 },
  { name: "Product E", sales: 1890, revenue: 4800 },
  { name: "Product F", sales: 2390, revenue: 3800 },
  { name: "Product G", sales: 3490, revenue: 4300 },
];

export function ProductPerformance() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey='sales' fill='#adfa1d' radius={[4, 4, 0, 0]} />
        <Bar dataKey='revenue' fill='#1a7f37' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
