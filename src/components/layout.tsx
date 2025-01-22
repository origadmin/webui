import * as React from "react";
import KBar from "src/components/KBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarProps, SidebarComponent } from "@/components/Sidebar";
import { Footer, FooterProps } from "@/components/footer";

type LayoutProps = {
  footer?: FooterProps;
  topNav?: API.TopNav[];
  sidebarProps?: SidebarProps;
  children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const { sidebarProps = {} } = props;
  return (
    <KBar>
      <SidebarProvider>
        <SidebarComponent {...sidebarProps}></SidebarComponent>
        <SidebarInset className='flex-1'>{props.children}</SidebarInset>
      </SidebarProvider>
      <Footer {...props.footer} />
    </KBar>
  );
}

export default Layout;
