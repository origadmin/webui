import { NavUser } from '@/components/layout/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { data } from '@/mocks/sidebar-data';
import * as React from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      {/*<SidebarContent>*/}
      {/*  <MainNav items={data.navGroups[0].items} />*/}
      {/*  <NavProjects projects={data.projects} />*/}
      {/*</SidebarContent>*/}
      {/*<SidebarContent>*/}
      {/*  {data.navGroups.map((props) => (*/}
      {/*    <NavGroup key={props.title} {...props} />*/}
      {/*  ))}*/}
      {/*</SidebarContent>*/}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
