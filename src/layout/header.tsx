import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { TopNav, TopNavProps } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { Notification } from "@/components/Notification";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { mockTopNav } from "@/mocks/mock-sidebar";
import SearchInput from "@/components/search-input";
import { ThemeSwitch } from "@/components/Theme";
import { Separator } from "@/components/ui/separator";

// This component is restored to its original and correct structure.
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
      {/* Left-aligned section, always containing SidebarTrigger and TopNav */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <TopNav {...topNavProps} />
      </div>

      {/* Right-aligned section for toolbar icons */}
      <div className="ml-auto flex items-center gap-2">
        <SearchInput />
        <ThemeSwitch />
        <Notification />
        <UserNav />
      </div>
    </header>
  );
}
