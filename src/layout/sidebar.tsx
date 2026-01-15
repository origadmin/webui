import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { SidebarComponent as Sidebar, SidebarProps } from "@/components/Sidebar";
import { Brand } from "@/components/brand";

// Helper function to recursively transform a backend View object into a frontend MenuItem object.
const transformViewToMenuItem = (view: API.System.View): API.MenuItem => {
  return {
    id: view.id,
    title: view.name || "",
    path: view.path,
    icon: view.icon,
    // Recursively transform children as well.
    children: view.children ? view.children.map(transformViewToMenuItem) : [],
  };
};

export function AppSidebar() {
  const { user, views } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !views) {
      return {
        header: { custom: <Brand /> },
        content: { items: [] },
      };
    }

    // The 'views' from useAuth are the direct children of the ROOT node.
    // We just need to transform them into the MenuItem format expected by the Sidebar component.
    const menuItems: API.MenuItem[] = views.map(transformViewToMenuItem);

    return {
      header: {
        custom: <Brand />,
      },
      content: {
        items: menuItems,
      },
      // All other complex logic for bottom items, footers, etc., is removed
      // to focus on the core task of rendering the dynamic menu.
    };
  }, [user, views]);

  return <Sidebar {...sidebarProps} />;
}
