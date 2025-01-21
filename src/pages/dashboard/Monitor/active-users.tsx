import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "Now", users: 300 },
  { time: "5m ago", users: 250 },
  { time: "10m ago", users: 200 },
  { time: "15m ago", users: 230 },
  { time: "20m ago", users: 280 },
  { time: "25m ago", users: 270 },
  { time: "30m ago", users: 240 },
];

export function ActiveUsers() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis dataKey='time' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey='users' fill='#adfa1d' radius={[4, 4, 0, 0]} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}
