import React from "react";
import { topNav } from "@/mocks/data";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { ThemeToggle } from "@/components/Theme";
import { TopNav } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { Breadcrumbs } from "./breadcrumbs";
import SearchInput from "./search-input";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export type HeaderProps = {
  topNav?: typeof topNav,
};

export default function Header(props?: HeaderProps) {
  const { topNav } = props || {};
  const items = useBreadcrumbs();
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
        {items.length > 0 && <Separator orientation='vertical' className='mr-2 h-4' />}
        {topNav && <TopNav navs={topNav} />}
      </div>
      <div className='flex items-center gap-2 px-4'></div>
      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
