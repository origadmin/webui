import React from "react";
import { mockTopNav } from "@/mocks/mockSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/Theme";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Content, ContentProps, HeaderProps } from "@/components/content";
import SearchInput from "@/components/search-input";
import { TopNav } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";

export default function PageContainer({
  children,
  props,
  headerProps = { menus: mockTopNav },
  scrollable = false, // using the global scroll
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  props?: ContentProps;
  headerProps?: HeaderProps;
}) {
  const renderScrollArea = () => {
    return scrollable ? (
      <ScrollArea className='h-[calc(100dvh-52px)]'>
        <div className='h-full p-4 md:px-6'>{children}</div>
      </ScrollArea>
    ) : (
      <div className='h-full p-4 md:px-6'>{children}</div>
    );
  };

  return (
    <Content {...props}>
      <Content.Header className='h-16 gap-2 justify-between ease-linear'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          {headerProps.menus && <TopNav menus={headerProps.menus} />}
        </div>
        <div className='flex items-center gap-2 px-4'></div>
        <div className='flex items-center gap-2 px-4'>
          <div className='hidden md:flex'>
            <SearchInput />
          </div>
          <ThemeToggle />
          <UserNav />
        </div>
      </Content.Header>
      <Content.Body className='flex flex-col'>
        <div className='px-4 md:px-6'>
          <Breadcrumbs />
        </div>
        {renderScrollArea()}
      </Content.Body>
    </Content>
  );
}
