import * as React from "react";
import { SidebarRail, Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FooterContent, FooterProps } from "./footer-content";
import { GroupContent, GroupContentProps } from "./group-content";
import { HeaderContent, HeaderProps } from "./header-content";

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header?: HeaderProps;
  content?: GroupContentProps;
  footer?: FooterProps;
};

const SidebarComponent: React.FC<SidebarProps> = ({ props, header, content, footer }) => {
  return (
    <Sidebar className='border-r-2' collapsible='icon' {...props}>
      {/* The parent div is now a flex container to push the footer down */}
      <div className="flex flex-col h-full">
        {header && <HeaderContent {...header} />}
        {content && <GroupContent {...content} />}
        {/* The footer will be pushed to the bottom because GroupContent is flex-1 */}
        {footer && <FooterContent {...footer} />}
      </div>
      <SidebarRail />
    </Sidebar>
  );
};

export type {
  SidebarProps,
  HeaderProps as SidebarHeaderProps,
  FooterProps as SidebarFooterProps,
  GroupContentProps as SidebarGroupContentProps,
};
export {
  SidebarComponent,
  HeaderContent,
  FooterContent,
  GroupContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
};
