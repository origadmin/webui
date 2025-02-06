import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import PageContainer from "@/components/PageContainer";
import AccountSettings from "./components/AccountSettings";
import NotificationSettings from "./components/NotificationSettings";
import ProfileSettings from "./components/ProfileSettings";

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className='p-4 md:px-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
      </div>
      <Tabs defaultValue='profile' orientation='vertical' className='w-full p-4'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='account'>Account</TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <ProfileSettings />
        </TabsContent>
        <TabsContent value='notifications'>
          <NotificationSettings />
        </TabsContent>
        <TabsContent value='account'>
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
