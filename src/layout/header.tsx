import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { TopNav, TopNavProps } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { Notification } from "@/components/Notification"; // Import Notification
import { SidebarTrigger } from "@/components/ui/sidebar";
import { mockTopNav } from "@/mocks/mock-sidebar";

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
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />
      <TopNav {...topNavProps} />
      <div className="ml-auto flex items-center gap-4">
        {/* The Notification icon should be part of the header's flex layout */}
        <Notification content={12} className="cursor-pointer" />
        <UserNav />
      </div>
    </header>
  );
}
