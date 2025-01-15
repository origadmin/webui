import { SidebarContentItem, SidebarFooterItem, SidebarHeaderItem, SidebarProps } from '@/components/Sidebar';
import { Footer, FooterProps } from '@/components/footer';
import KBar from '@/components/kbar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';
import { API } from '@/types/typings';
import * as React from 'react';

import Header from './header';

type LayoutProps = {
  footer: FooterProps;
  topNav?: API.TopNav[];
  sidebarProps?: SidebarProps;
  children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const { sidebarProps } = props;
  return (
    <KBar>
      <SidebarProvider>
        <Sidebar className='border-r' collapsible='icon' {...(sidebarProps ? sidebarProps.props : {})}>
          {sidebarProps?.header && <SidebarHeaderItem {...sidebarProps.header} />}
          {sidebarProps?.content && <SidebarContentItem {...sidebarProps.content} />}
          {sidebarProps?.footer && <SidebarFooterItem {...sidebarProps.footer} />}
          <SidebarRail />
        </Sidebar>
        <SidebarInset className='flex-1'>
          <Header topNav={props.topNav} />
          {props.children}
        </SidebarInset>
      </SidebarProvider>
      <Footer {...props.footer} />
    </KBar>
  );
}

export default Layout;
