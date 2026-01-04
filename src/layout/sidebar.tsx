import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { buildMenuTree } from "@/utils/menu";
import { SidebarComponent as Sidebar, SidebarProps } from "@/components/Sidebar";
import { Brand } from "@/components/Brand";

export function AppSidebar() {
  const { user, permissions: views } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !views) {
      return {};
    }

    const menuItems = buildMenuTree(views);
    const mainMenus = menuItems.filter((item) => item.keyword !== "submenu");
    const subMenus = menuItems.filter((item) => item.keyword === "submenu");

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
        custom: <Brand />,
      },
      content: {
        items: mainMenus,
        seconds: {
          items: subMenus,
        },
      },
      footer: {
        version: "v1.0.0",
        menus: systemMenus,
      },
    };
  }, [user, views]);

  return <Sidebar {...sidebarProps} />;
}
