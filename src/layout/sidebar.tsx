import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { buildMenuTree } from "@/utils/menu";
import { SidebarComponent as Sidebar, SidebarProps } from "@/components/Sidebar";
import { IconCommand } from "@tabler/icons-react";

export function AppSidebar() {
  const { user, permissions: views } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !views) {
      return {};
    }

    const menuItems = buildMenuTree(views);
    // TODO: Implement location-based filtering here when backend supports it
    // const sidebarMenus = menuItems.filter(m => !m.location || m.location === 'sidebar');
    
    const mainMenus = menuItems.filter((item) => item.keyword !== "submenu");
    const subMenus = menuItems.filter((item) => item.keyword === "submenu");

    // Brand / Team Switcher Data
    const teams = [
      {
        name: "OrigAdmin WebUI",
        logo: IconCommand,
        plan: "Enterprise",
      },
    ];

    // System Settings Menu (Sidebar Footer)
    const systemMenus = [
      {
        title: "Global Settings",
        onClick: () => console.log("Go to Global Settings"),
      },
      {
        title: "About OrigAdmin",
        onClick: () => console.log("Show About"),
      },
    ];

    return {
      header: {
        teams: teams,
      },
      content: {
        items: mainMenus,
        seconds: {
          items: subMenus,
        },
      },
      footer: {
        // Now passing menus instead of user object, matching the updated footer-content.tsx
        version: "v1.0.0",
        menus: systemMenus,
      },
    };
  }, [user, views]);

  return <Sidebar {...sidebarProps} />;
}
