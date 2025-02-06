import * as React from "react";
import KBar from "src/components/KBar";
import { Separator } from "@/components/ui/separator";
import { SidebarProps, SidebarComponent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import { ThemeSwitch } from "@/components/Theme";
import { Footer, FooterProps } from "@/components/footer";
import SearchInput from "@/components/search-input";
import { TopNav, TopNavProps } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";

export type LayoutProps = {
  key?: string;
  footerProps?: FooterProps;
  topNavProps?: TopNavProps;
  showSidebarTrigger?: boolean;
  sidebarProps?: SidebarProps;
  navToolbars?: React.ReactNode[];
  children?: React.ReactNode;
};

export function Layout({
  showSidebarTrigger = true,
  children,
  navToolbars = [<SearchInput />, <ThemeSwitch />, <UserNav />],
  topNavProps,
  ...props
}: LayoutProps) {
  const { sidebarProps = {} } = props;

  const renderNavToolbars = () => {
    if (!navToolbars) {
      return null;
    }
    return navToolbars.map((bar, index) => {
      return <div key={index}>{bar}</div>;
    });
  };

  return (
    <KBar>
      <SidebarProvider>
        <SidebarComponent {...sidebarProps} />
        <SidebarInset className='flex-1'>
          <div className='flex flex-row items-center p-4 md:px-4 shadow-none gap-2 justify-between ease-linear'>
            <div className='flex items-center gap-2 px-4'>
              {showSidebarTrigger && <SidebarTrigger className='-ml-1' />}
              {showSidebarTrigger && <Separator orientation='vertical' className='mr-2 h-4' />}
              {topNavProps && <TopNav {...topNavProps} />}
            </div>
            <div className='flex items-center gap-2 px-4'></div>
            <div className='flex items-center gap-2 px-4'>{renderNavToolbars()}</div>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
      <Footer {...props.footerProps} />
    </KBar>
  );
}

export default Layout;
