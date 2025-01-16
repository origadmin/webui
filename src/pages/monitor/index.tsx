import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveUsers } from "./active-users";
import { ErrorLogs } from "./error-logs";
import { PerformanceMetrics } from "./performance-metrics";
import { ServerStatus } from "./server-status";
import { SystemHealth } from "./system-health";

export default function Monitor() {
  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>System Monitor</h2>
      </div>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='performance'>Performance</TabsTrigger>
          <TabsTrigger value='errors'>Errors</TabsTrigger>
          <TabsTrigger value='users'>Users</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <SystemHealth />
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <PerformanceMetrics />
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Server Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ServerStatus />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='performance' className='space-y-4'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
              <CardDescription>CPU, Memory, and Network usage over time</CardDescription>
            </CardHeader>
            <CardContent className='pl-2'>
              <PerformanceMetrics detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='errors' className='space-y-4'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
              <CardDescription>Recent system errors and exceptions</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorLogs />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='users' className='space-y-4'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Real-time user activity monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveUsers />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
