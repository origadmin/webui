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

    // Mock data to demonstrate grouping, layering, and sub-menus
    const mockMenuItems: API.MenuItem[] = [
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
        ]
      },
      // Layer separator will be inserted here
      { id: "6", title: "Tasks", path: "/tasks", icon: "check-check", location: "layer-2" },
      { id: "7", title: "Chats", path: "/chats", icon: "message-circle", location: "layer-2" },
    ];

    // Process items to include group labels and separators
    const processedItems: (API.MenuItem | { type: 'separator' | 'group-label', label: string })[] = [];
    let lastGroup: string | undefined = undefined;
    let layerSeparated = false;

    // NO MORE SORTING - process in the original order
    mockMenuItems.forEach(item => {
      // Handle layer separation
      if (item.location === 'layer-2' && !layerSeparated) {
        processedItems.push({ type: 'separator', label: 'layer-separator' });
        layerSeparated = true;
        lastGroup = undefined; // Reset group tracking after layer separator
      }

      // Handle grouping
      if (item.group && item.group !== lastGroup) {
        // Add a separator before a new group, but not for the very first item
        if (processedItems.length > 0 && (processedItems[processedItems.length - 1] as API.MenuItem).id) {
            processedItems.push({ type: 'separator', label: `sep-before-${item.group}` });
        }
        processedItems.push({ type: 'group-label', label: item.group });
        lastGroup = item.group;
      }
      processedItems.push(item);
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
        items: processedItems,
      },
      footer: {
        version: "v1.0.0",
        menus: systemMenus,
      },
    };
  }, [user, views]);

  return <Sidebar {...sidebarProps} />;
}
