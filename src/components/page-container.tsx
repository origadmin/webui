import React from "react";
import { mockTopNav } from "@/mocks/mockSidebar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/Theme";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Content, ContentProps, HeaderProps } from "@/components/content";
import SearchInput from "@/components/search-input";
import { TopNav, TopNavProps } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";

interface PageContainerProps {
  board?: boolean;
  navMenus?: TopNavProps["menus"];
  navToolbars?: React.ReactNode[];
  children: React.ReactNode;
  props?: ContentProps;
  headerProps?: HeaderProps;
  scrollable?: boolean;
}

export default function PageContainer({
  board = true,
  children,
  props,
  navMenus = mockTopNav,
  navToolbars = [<SearchInput />, <ThemeToggle />, <UserNav />],
  headerProps = {
    show: true,
  },
  scrollable = false, // using the global scroll
}: PageContainerProps) {
  const { className } = props || {};
  const renderScrollArea = () => {
    return scrollable ? (
      <ScrollArea className='h-[calc(100dvh-52px)]'>
        <div className='h-full md:px-6'>{children}</div>
      </ScrollArea>
    ) : (
      <div className='h-full md:px-6'>{children}</div>
    );
  };
  const renderContent = () => {
    return (
      <Content className={className} {...props}>
        {headerProps.show && (
          <Content.Header className='h-16 gap-2 justify-between ease-linear'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              {navMenus && <TopNav menus={navMenus} />}
            </div>
            <div className='w-full flex items-center gap-2 px-4'></div>
            <div className='flex items-center gap-2 px-4'>
              {navToolbars && navToolbars.map((toolbar) => <div className='md:flex'>{toolbar}</div>)}
            </div>
          </Content.Header>
        )}
        {/*className={cn(board ? "rounded-lg border flex flex-col" : "flex flex-col", className)}*/}
        <Content.Body className='flex flex-col'>
          <div className='px-4 md:px-6'>
            <Breadcrumbs />
          </div>
          {renderScrollArea()}
        </Content.Body>
      </Content>
    );
  };
  return board ? <Card>{renderContent()}</Card> : renderContent();
}
