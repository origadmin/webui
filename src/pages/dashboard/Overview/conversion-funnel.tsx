import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { stage: "Visitors", count: 5000 },
  { stage: "Product View", count: 3500 },
  { stage: "Add to Cart", count: 2200 },
  { stage: "Checkout", count: 1500 },
  { stage: "Purchase", count: 1000 },
];

export function ConversionFunnel() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data} layout='vertical'>
        <XAxis type='number' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis dataKey='stage' type='category' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#adfa1d' radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
