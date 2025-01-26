import * as React from "react";
import KBar from "src/components/KBar";
import { Separator } from "@/components/ui/separator";
import { SidebarProps, SidebarComponent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/Theme";
import { Footer, FooterProps } from "@/components/footer";
import SearchInput from "@/components/search-input";
import { TopNav, TopNavProps } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";

type LayoutProps = {
  // className?: string;
  // fixed?: boolean;
  footer?: FooterProps;
  topNavProps?: TopNavProps;
  sidebarProps?: SidebarProps;
  navToolbars?: React.ReactNode[];
  showSidebarTrigger?: boolean;
  children: React.ReactNode;
};

export function Layout({
  showSidebarTrigger = true,
  children,
  navToolbars = [<SearchInput />, <ThemeToggle />, <UserNav />],
  topNavProps,
  ...props
}: LayoutProps) {
  const { sidebarProps = {} } = props;
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
            <div className='flex items-center gap-2 px-4'>
              {navToolbars && navToolbars.map((toolbar) => <div className='md:flex'>{toolbar}</div>)}
            </div>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
      <Footer {...props.footer} />
    </KBar>
  );
}

export default Layout;
