import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import AccountSettings from "./components/AccountSettings";
import NotificationSettings from "./components/NotificationSettings";
import ProfileSettings from "./components/ProfileSettings";

export default function SettingsPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Settings</h1>
      <Tabs defaultValue='profile' className='w-full'>
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
    </div>
  );
}
