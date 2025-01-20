import * as React from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { SidebarContentItem, SidebarContentProps } from "@/components/Sidebar/sidebar-content-item.tsx";
import { SidebarFooterItem, SidebarFooterProps } from "@/components/Sidebar/sidebar-footer";
import { SidebarHeaderItem, SidebarHeaderProps } from "@/components/Sidebar/sidebar-header";

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header?: SidebarHeaderProps;
  content?: SidebarContentProps;
  footer?: SidebarFooterProps;
};

const SidebarComponent: React.FC<SidebarProps> = ({ props, header, content, footer }: SidebarProps) => {
  return (
    <Sidebar className='border-r' collapsible='icon' {...props}>
      {header && <SidebarHeaderItem {...header} />}
      {content && <SidebarContentItem {...content} />}
      {footer && <SidebarFooterItem {...footer} />}
      <SidebarRail />
    </Sidebar>
  );
};

export type { SidebarProps, SidebarHeaderProps, SidebarFooterProps, SidebarContentProps };
export { SidebarComponent, SidebarHeaderItem, SidebarFooterItem, SidebarContentItem };
