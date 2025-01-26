import AnalyticsContent from "@/pages/dashboard/Overview/analytics";
import { GeographicDistribution } from "@/pages/dashboard/Overview/geographic-distribution";
import NotificationsContent from "@/pages/dashboard/Overview/notifications";
import OverviewContent from "@/pages/dashboard/Overview/overview";
import { ProductPerformance } from "@/pages/dashboard/Overview/product-performance";
import ReportsContent from "@/pages/dashboard/Overview/reports";
import { RevenueChart } from "@/pages/dashboard/Overview/revenue-chart";
import { UserActivityChart } from "@/pages/dashboard/Overview/user-activity-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/custom/button";
import PageContainer from "@/components/page-container";

export default function OverviewPage() {
  return (
    /* ===== Main ===== */
    <PageContainer>
      <div className='p-4 md:px-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <div className='flex items-center'>
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue='overview' orientation='vertical' className='w-full p-4'>
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
