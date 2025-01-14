import { NavUser } from '@/components/layout/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { data } from '@/mocks/sidebar-data';

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

type SidebarProps = {
  // items: SidebarItem[];
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: SidebarProps) {
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
