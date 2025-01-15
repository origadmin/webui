"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4000 },
  { month: "May", revenue: 7000 },
  { month: "Jun", revenue: 6000 },
  { month: "Jul", revenue: 8000 },
  { month: "Aug", revenue: 9000 },
  { month: "Sep", revenue: 8000 },
  { month: "Oct", revenue: 10000 },
  { month: "Nov", revenue: 11000 },
  { month: "Dec", revenue: 12000 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  )
}

