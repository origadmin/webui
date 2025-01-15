import ThemeSwitch from '@/components/Theme/theme-switch';
import { Content } from '@/components/content';
import { Button } from '@/components/custom/button';
import PageContainer from '@/components/page-container';
import { Search } from '@/components/search';
import { TopNav } from '@/components/top-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from '@/components/user-nav';

import AnalyticsContent from './analytics';
import OverviewContent from './overview';

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
      </Tabs>
    </PageContainer>
  );
}
