import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { TopNav, TopNavProps } from "@/components/top-nav"; // Assuming this is the pure UI component
import { mockTopNav } from "@/mocks/mock-sidebar"; // Still using mock for now

export function AppHeader() {
  const { user } = useAuth();

  const topNavProps: TopNavProps = useMemo(() => {
    if (!user) {
      return {};
    }
    // In the future, top navigation menus can also be derived from user permissions
    return {
      menus: mockTopNav,
    };
  }, [user]);

  return <TopNav {...topNavProps} />;
}
