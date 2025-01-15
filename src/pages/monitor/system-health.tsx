import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Cpu, Server, Zap } from 'lucide-react'

const metrics = [
  {
    title: "CPU Usage",
    value: "24%",
    icon: Cpu,
  },
  {
    title: "Memory Usage",
    value: "62%",
    icon: Server,
  },
  {
    title: "Network",
    value: "75 Mbps",
    icon: Activity,
  },
  {
    title: "Server Uptime",
    value: "99.9%",
    icon: Zap,
  },
]

export function SystemHealth() {
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
          </CardContent>
        </Card>
      ))}
    </>
  )
}

