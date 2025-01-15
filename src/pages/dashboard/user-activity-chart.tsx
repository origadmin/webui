"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "2023-01-01", activeUsers: 2400 },
  { date: "2023-01-02", activeUsers: 1398 },
  { date: "2023-01-03", activeUsers: 9800 },
  { date: "2023-01-04", activeUsers: 3908 },
  { date: "2023-01-05", activeUsers: 4800 },
  { date: "2023-01-06", activeUsers: 3800 },
  { date: "2023-01-07", activeUsers: 4300 },
]

export function UserActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
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
          tickFormatter={(value) => `${value}`}
        />
        <Line type="monotone" dataKey="activeUsers" stroke="#adfa1d" strokeWidth={2} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

