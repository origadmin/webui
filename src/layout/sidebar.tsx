import { useMemo } from "react";
import { ViewScopes, ViewTypes } from "@/pages/system/view/constants";
import { Settings, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { SidebarComponent as Sidebar, SidebarProps } from "@/components/Sidebar";
import { Brand } from "@/components/brand";

export function AppSidebar() {
  const { user, views } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !views || views.length === 0) {
      return { header: { custom: <Brand /> }, content: { items: [] } };
    }

    // 1. Find the root node for the 'sidebar' scope from the complete view tree.
    const sidebarRoot = views.find((v) => v.scope === ViewScopes.SIDEBAR && v.type === ViewTypes.ROOT);

    // 2. The direct children of the root are the items to be rendered.
    const sidebarItems = sidebarRoot?.children || [];

    // 3. Separate items into main content and bottom items based on their own scope property.
    const mainItems = sidebarItems.filter((item) => !item.scope || item.scope === ViewScopes.SIDEBAR);
    const bottomItems = sidebarItems.filter((item) => item.scope === ViewScopes.SIDEBAR_FOOTER);
    const systemMenus = [
      {
        title: "Global Settings",
        icon: <Settings size={16} />,
        onClick: () => console.log("Go to Global Settings"),
      },
      {
        title: "Team Members",
        icon: <Users size={16} />,
        onClick: () => console.log("Go to Team Members"),
      },
    ];
    return {
      header: {
        custom: <Brand />,
      },
      content: {
        items: mainItems,
      },
      bottom: {
        items: bottomItems,
      },
      footer: {
        version: "v1.0.0",
        menus: systemMenus,
      },
    };
  }, [user, views]);

  return <Sidebar {...sidebarProps} />;
}
