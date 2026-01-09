import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  SidebarComponent as Sidebar,
  SidebarProps,
} from "@/components/Sidebar";
import { Brand } from "@/components/Brand";
import { IconSettings, IconUsers } from "@tabler/icons-react";

export function AppSidebar() {
  const { user, permissions: views } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !views) {
      return {};
    }

    const mockMenuItems: (API.MenuItem & { group?: string; location?: string })[] = [
      // Main Menu Items (with groups and nesting)
      { id: "1", title: "Dashboard", path: "/dashboard/overview", icon: "layout-dashboard", group: "Analytics" },
      { id: "2", title: "Analytics", path: "/dashboard/analytics", icon: "chart-bar", group: "Analytics" },
      { 
        id: "3", 
        title: "System", 
        icon: "settings", 
        group: "Management",
        children: [
          { id: "3-1", title: "Users", path: "/system/user", icon: "users" },
          { id: "3-2", title: "Roles", path: "/system/role", icon: "user-check" },
          { id: "3-3", title: "Permissions", path: "/system/permission", icon: "shield-lock" },
          { id: "3-4", title: "Views", path: "/system/view", icon: "layout-grid" },
          { id: "3-5", title: "Resources", path: "/system/resource", icon: "box" },
        ]
      },
      // Bottom Menu Items
      { id: "6", title: "Tasks", path: "/tasks", icon: "check-check", location: "bottom" },
      { id: "7", title: "Chats", path: "/chats", icon: "message-circle", location: "bottom" },
    ];

    // --- Correct Data Filtering ---
    const mainItems = mockMenuItems.filter(item => !item.location || item.location === 'sidebar');
    const bottomItems = mockMenuItems.filter(item => item.location === 'bottom');

    // Process main items for grouping
    const processedMainItems: (API.MenuItem | { type: 'group-label', label: string })[] = [];
    let lastGroup: string | undefined = undefined;

    mainItems.forEach(item => {
      if (item.group && item.group !== lastGroup) {
        processedMainItems.push({ type: 'group-label', label: item.group });
        lastGroup = item.group;
      }
      processedMainItems.push(item);
    });
    
    const systemMenus = [
      {
        title: "Global Settings",
        icon: <IconSettings size={16} />,
        onClick: () => console.log("Go to Global Settings"),
      },
      {
        title: "Team Members",
        icon: <IconUsers size={16} />,
        onClick: () => console.log("Go to Team Members"),
      },
    ];

    return {
      header: {
        custom: <Brand />,
      },
      content: {
        items: processedMainItems,
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
