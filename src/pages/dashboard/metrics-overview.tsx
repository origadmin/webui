import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react'

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.1%",
    icon: Users,
  },
  {
    title: "New Customers",
    value: "+573",
    change: "+201 since last week",
    icon: ShoppingCart,
  },
  {
    title: "Engagement Rate",
    value: "58.16%",
    change: "+5.4%",
    icon: Activity,
  },
]

export function MetricsOverview() {
  return (
    <>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {metric.change.startsWith('+') ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
                {metric.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

