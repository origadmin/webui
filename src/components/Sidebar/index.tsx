import * as React from "react";
import { SidebarRail, Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BottomContent, BottomContentProps } from "./bottom-content";
import { FooterContent, FooterProps } from "./footer-content";
import { GroupContent, GroupContentProps } from "./group-content";
import { HeaderContent, HeaderProps } from "./header-content";


type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header?: HeaderProps;
  content?: GroupContentProps;
  bottom?: BottomContentProps;
  footer?: FooterProps;
};

const SidebarComponent: React.FC<SidebarProps> = ({ props, header, content, bottom, footer }) => {
  return (
    <Sidebar className='border-r-2' collapsible='icon' {...props}>
      {header && <HeaderContent {...header} />}
      {content && <GroupContent {...content} />}
      {bottom && <BottomContent {...bottom} />}
      {footer && <FooterContent {...footer} />}
      <SidebarRail />
    </Sidebar>
  );
};

export type {
  SidebarProps,
  HeaderProps as SidebarHeaderProps,
  FooterProps as SidebarFooterProps,
  GroupContentProps as SidebarGroupContentProps,
  BottomContentProps as SidebarBottomContentProps,
};
export {
  SidebarComponent,
  HeaderContent,
  FooterContent,
  GroupContent,
  BottomContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
};
