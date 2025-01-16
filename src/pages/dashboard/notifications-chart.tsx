"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Feb",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Mar",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Apr",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "May",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Jun",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Jul",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Aug",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Sep",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Oct",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Nov",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Dec",
    sent: Math.floor(Math.random() * 5000) + 1000,
    opened: Math.floor(Math.random() * 3000) + 500,
  },
];

export function NotificationsChart() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey='sent' fill='#adfa1d' radius={[4, 4, 0, 0]} />
        <Bar dataKey='opened' fill='#1a7f37' radius={[4, 4, 0, 0]} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}
