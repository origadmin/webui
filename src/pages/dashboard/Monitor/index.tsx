import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/PageContainer/page-container";
import { ActiveUsers } from "./active-users";
import { ErrorLogs } from "./error-logs";
import { PerformanceMetrics } from "./performance-metrics";
import { ServerStatus } from "./server-status";
import { SystemHealth } from "./system-health";

export default function MonitorPage() {
  return (
    <PageContainer>
      <div className='p-4 md:px-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>System Monitor</h1>
      </div>
      <Tabs defaultValue='overview' orientation='vertical' className='w-full p-4'>
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
    </PageContainer>
  );
}
