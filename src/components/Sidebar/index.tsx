import { SidebarContentItem, SidebarContentProps } from '@/components/Sidebar/sidebar-content';
import { SidebarFooterItem, SidebarFooterProps } from '@/components/Sidebar/sidebar-footer';
import { SidebarHeaderItem, SidebarHeaderProps } from '@/components/Sidebar/sidebar-header';
import { Sidebar } from '@/components/ui/sidebar';
import * as React from 'react';

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header: SidebarHeaderProps;
  content: SidebarContentProps;
  footer: SidebarFooterProps;
};

export type { SidebarProps, SidebarHeaderProps, SidebarFooterProps, SidebarContentProps };
export { SidebarHeaderItem, SidebarFooterItem, SidebarContentItem };
