import * as React from "react";
import { SidebarRail, Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FooterContent, FooterProps } from "./footer-content";
import { GroupContent, GroupContentProps } from "./group-content";
import { HeaderContent, HeaderProps } from "./header-content";
import { BottomContent, BottomContentProps } from "./bottom-content"; // Import the new component

type SidebarProps = {
  props?: React.ComponentProps<typeof Sidebar>;
  header?: HeaderProps;
  content?: GroupContentProps;
  bottom?: BottomContentProps; // Prop for the bottom menu
  footer?: FooterProps;
};

const SidebarComponent: React.FC<SidebarProps> = ({ props, header, content, bottom, footer }) => {
  return (
    <Sidebar className='border-r-2' collapsible='icon' {...props}>
      {/* This div is the flex container for the entire sidebar content */}
      <div className="flex flex-col h-full">
        {header && <HeaderContent {...header} />}
        
        {/* Main scrollable content */}
        {content && <GroupContent {...content} />}
        
        {/* Bottom fixed menu (above the absolute footer) */}
        {bottom && <BottomContent {...bottom} />}
        
        {/* Absolute bottom footer */}
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
  BottomContentProps as SidebarBottomContentProps,
};
export {
  SidebarComponent,
  HeaderContent,
  FooterContent,
  GroupContent,
  BottomContent, // Export the new component
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
};
