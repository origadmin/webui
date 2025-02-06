import * as React from "react";
import { SidebarRail, Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FooterContent, FooterProps } from "./footer-content";
import { GroupContent, GroupContentProps } from "./group-content";
import { HeaderContent, HeaderProps } from "./header-content";
import { MainContent, MainContentProps } from "./main-content";
import { SecondaryContent, SecondaryContentProps } from "./secondary-content";

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header?: HeaderProps;
  content?: GroupContentProps;
  footer?: FooterProps;
};

const SidebarComponent: React.FC<SidebarProps> = ({ props, header, content, footer }: SidebarProps) => {
  return (
    <Sidebar className='border-r-2' collapsible='icon' {...props}>
      {header && <HeaderContent {...header} />}
      {content && <GroupContent {...content} />}
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
  MainContentProps as SidebarMainContentProps,
  SecondaryContentProps as SidebarSecondaryContentProps,
};
export {
  SidebarComponent,
  HeaderContent,
  FooterContent,
  MainContent,
  SecondaryContent,
  GroupContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
};
