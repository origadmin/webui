import { SidebarContentItem, SidebarFooterItem, SidebarHeaderItem, SidebarProps } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/Theme';
import { Breadcrumbs } from '@/components/breadcrumbs';
import KBar from '@/components/kbar';
import SearchInput from '@/components/search-input';
import { TopNav } from '@/components/top-nav';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { API } from '@/types/typings';
import * as React from 'react';

type LayoutProps = {
  topNav?: API.TopNav[];
  sidebarProps?: SidebarProps;
  children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const { sidebarProps } = props;
  return (
    <KBar>
      <SidebarProvider>
        <Sidebar className='border-r' collapsible='icon' {...(sidebarProps?.props || {})}>
          {sidebarProps?.header && <SidebarHeaderItem {...sidebarProps.header} />}
          {sidebarProps?.content && <SidebarContentItem {...sidebarProps.content} />}
          {sidebarProps?.footer && <SidebarFooterItem {...sidebarProps.footer} />}
          <SidebarRail />
        </Sidebar>
        <SidebarInset className='flex-1'>
          <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumbs />
              <Separator orientation='vertical' className='mr-2 h-4' />
              {props.topNav && <TopNav navs={props.topNav} />}
            </div>
            <div className='flex items-center gap-2 px-4'></div>
            <div className='flex items-center gap-2 px-4'>
              <div className='hidden md:flex'>
                <SearchInput />
              </div>
              <ThemeToggle />
              <UserNav />
            </div>
          </header>
          {props.children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}

export default Layout;
