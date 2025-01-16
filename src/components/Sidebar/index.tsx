import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarContentItem, SidebarContentProps } from "@/components/Sidebar/sidebar-content";
import { SidebarFooterItem, SidebarFooterProps } from "@/components/Sidebar/sidebar-footer";
import { SidebarHeaderItem, SidebarHeaderProps } from "@/components/Sidebar/sidebar-header";

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>,
  header: SidebarHeaderProps,
  content: SidebarContentProps,
  footer: SidebarFooterProps,
};

export type { SidebarProps, SidebarHeaderProps, SidebarFooterProps, SidebarContentProps };
export { SidebarHeaderItem, SidebarFooterItem, SidebarContentItem };
