import KBar from '@/components/kbar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Home, Settings, Users } from 'lucide-react';
import * as React from 'react';
import {TeamSwitcher} from "@/components/team-switcher";
import {data} from "@/mocks/sidebar-data";
import {NavUser} from "@/components/layout/nav-user";

interface LayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <KBar>
      <SidebarProvider>
        <div className='flex h-screen'>
          <Sidebar className='border-r'>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='/'>
                      <Home />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='/settings'>
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            {/*<SidebarFooter>/!* Add footer content here if needed *!/</SidebarFooter>*/}
            <SidebarFooter>
              <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset className='flex-1'>
            <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-6'>
              <SidebarTrigger />
              <div className='font-semibold'>Page Title</div>
            </header>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </KBar>
  );
}

export default Layout;
