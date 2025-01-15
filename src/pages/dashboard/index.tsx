import { Button } from '@/components/custom/button';
import PageContainer from '@/components/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationsContent from '@/pages/dashboard/notifications';
import ReportsContent from '@/pages/dashboard/reports';

import AnalyticsContent from './analytics';
import { GeographicDistribution } from './geographic-distribution';
import OverviewContent from './overview';
import { ProductPerformance } from './product-performance';
import { RevenueChart } from './revenue-chart';
import { UserActivityChart } from './user-activity-chart';

export default function Dashboard() {
  return (
    /* ===== Main ===== */
    <PageContainer>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <div className='flex items-center space-x-2'>
          <Button>Download</Button>
        </div>
      </div>
      <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
        <div className='w-full overflow-x-auto pb-2'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            <TabsTrigger value='revenue'>Revenue</TabsTrigger>
            <TabsTrigger value='products'>Products</TabsTrigger>
            <TabsTrigger value='users'>Users</TabsTrigger>
            <TabsTrigger value='reports'>Reports</TabsTrigger>
            <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='overview' className='space-y-4'>
          <OverviewContent />
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <AnalyticsContent />
        </TabsContent>
        <TabsContent value='revenue' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <GeographicDistribution />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='products' className='space-y-4'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <ProductPerformance />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='users' className='space-y-4'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Daily active users over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className='pl-2'>
              <UserActivityChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reports' className='space-y-4'>
          <ReportsContent />
        </TabsContent>
        <TabsContent value='notifications' className='space-y-4'>
          <NotificationsContent />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
