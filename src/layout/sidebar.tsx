import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { buildMenuTree } from "@/utils/menu";
import { SidebarComponent as Sidebar, SidebarProps } from "@/components/Sidebar";
import { IconUsers } from "@tabler/icons-react"; // Import a default icon

export function AppSidebar() {
  const { user, permissions: views } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !views) {
      return {};
    }

    const menuItems = buildMenuTree(views);
    const mainMenus = menuItems.filter((item) => item.keyword !== "submenu");
    const subMenus = menuItems.filter((item) => item.keyword === "submenu");

    // THE CRITICAL FIX: Construct the `teams` array with the correct structure.
    const teams = [
      {
        name: user.nickname || "Default Team",
        logo: IconUsers, // Provide a default icon component
        plan: "Free", // Provide a default plan
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
        user: {
          name: user.nickname || "Unknown User",
          email: user.email || "",
          avatar: user.avatar || "/static/images/avatar.png",
        },
      },
    };
  }, [user, views]);

  return <Sidebar {...sidebarProps} />;
}
