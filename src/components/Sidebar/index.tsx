import * as React from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { SidebarFooterContent, SidebarFooterProps } from "./sidebar-footer-content";
import { SidebarGroupContent, SidebarGroupContentProps } from "./sidebar-group-content.tsx";
import { SidebarHeaderContent, SidebarHeaderProps } from "./sidebar-header-content";
import { SidebarSecondaryContent, SidebarSecondaryContentProps } from "./sidebar-secondary-content";

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header?: SidebarHeaderProps;
  content?: SidebarGroupContentProps;
  footer?: SidebarFooterProps;
};

const SidebarComponent: React.FC<SidebarProps> = ({ props, header, content, footer }: SidebarProps) => {
  return (
    <Sidebar className='border-r' collapsible='icon' {...props}>
      {header && <SidebarHeaderContent {...header} />}
      {content && <SidebarGroupContent {...content} />}
      {footer && <SidebarFooterContent {...footer} />}
      <SidebarRail />
    </Sidebar>
  );
};

export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarSecondaryContentProps,
  SidebarGroupContentProps,
};
export { SidebarComponent, SidebarHeaderContent, SidebarFooterContent, SidebarSecondaryContent, SidebarGroupContent };
