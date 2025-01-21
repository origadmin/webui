import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ConversionFunnel } from "./conversion-funnel.tsx";
import { MetricsOverview } from "./metrics-overview.tsx";
import { UserActivityChart } from "./user-activity-chart.tsx";

const invoices = [
  {
    product: "Landing Page Template",
    status: "Paid",
    sales: 1800,
  },
  {
    product: "Dashboard UI Kit",
    status: "Pending",
    sales: 1350,
  },
  {
    product: "Icon Set",
    status: "Paid",
    sales: 900,
  },
  {
    product: "Marketing Templates",
    status: "Paid",
    sales: 750,
  },
  {
    product: "Font Collection",
    status: "Pending",
    sales: 500,
  },
];

export default function AnalyticsContent() {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <MetricsOverview />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <UserActivityChart />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionFunnel />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
