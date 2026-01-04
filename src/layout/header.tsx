import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { TopNav, TopNavProps } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { Notification } from "@/components/Notification";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { mockTopNav } from "@/mocks/mock-sidebar";
import SearchInput from "@/components/search-input";
import { ThemeSwitch } from "@/components/Theme";

export function AppHeader() {
  const { user } = useAuth();

  const topNavProps: TopNavProps = useMemo(() => {
    if (!user) {
      return {};
    }
    return {
      menus: mockTopNav,
    };
  }, [user]);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      
      {/* TopNav placed after SidebarTrigger */}
      <div className="hidden md:flex">
         <TopNav {...topNavProps} />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <SearchInput />
        <ThemeSwitch />
        <Notification content={12} className="cursor-pointer" />
        <UserNav />
      </div>
    </header>
  );
}
