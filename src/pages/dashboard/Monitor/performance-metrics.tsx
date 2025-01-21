import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", cpu: 10, memory: 20, network: 30 },
  { time: "01:00", cpu: 20, memory: 25, network: 35 },
  { time: "02:00", cpu: 15, memory: 30, network: 25 },
  { time: "03:00", cpu: 25, memory: 35, network: 40 },
  { time: "04:00", cpu: 30, memory: 40, network: 45 },
  { time: "05:00", cpu: 20, memory: 30, network: 35 },
  { time: "06:00", cpu: 15, memory: 25, network: 30 },
];

export function PerformanceMetrics({ detailed = false }: { detailed?: boolean }) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={data}>
        <XAxis dataKey='time' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Line type='monotone' dataKey='cpu' stroke='#adfa1d' strokeWidth={2} />
        {detailed && (
          <>
            <Line type='monotone' dataKey='memory' stroke='#1a7f37' strokeWidth={2} />
            <Line type='monotone' dataKey='network' stroke='#3b82f6' strokeWidth={2} />
          </>
        )}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
