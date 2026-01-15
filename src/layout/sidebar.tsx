import { useMemo } from "react";
import { ViewScopes, ViewTypes } from "@/pages/system/view/constants";
import { t } from "@/utils/locale";
import { buildTree } from "@/utils/tree";
import { IconSettings, IconUsers } from "@tabler/icons-react";
import { useAuth } from "@/hooks/use-auth";
import { SidebarComponent as Sidebar, SidebarProps } from "@/components/Sidebar";
import { Brand } from "@/components/brand";


// A direct and robust transformation from a backend View to a frontend MenuItem.
const transformViewToMenuItem = (view: API.System.View): API.MenuItem | null => {
  // A view without an ID is invalid and cannot be used.
  if (!view.id) {
    return null;
  }
  return {
    id: view.id,
    title: view.i18n ? t(view.i18n) : view.name || "",
    path: view.path,
    icon: view.icon,
    type: view.type,
    // Preserve the scope property so we can use it for filtering later.
    scope: view.scope,
    parent_id: view.parent_id,
    // Recursively transform children.
    children: view.children
      ? view.children.map(transformViewToMenuItem).filter((v): v is API.MenuItem => v !== null)
      : [],
  };
};

export function AppSidebar() {
  const { user, views: flatViews } = useAuth();

  const sidebarProps: SidebarProps = useMemo(() => {
    if (!user || !flatViews || flatViews.length === 0) {
      return { header: { custom: <Brand /> }, content: { items: [] } };
    }

    // 1. Transform the raw backend data into a flat list of MenuItems.
    //    Filter out any null results from transformation (e.g., views without an ID).
    const menuItems = flatViews.map(transformViewToMenuItem).filter((v): v is API.MenuItem => v !== null);

    // 2. Build the tree. Because API.MenuItem now has a mandatory `id`, this is type-safe.
    const viewTree = buildTree(menuItems);

    // 3. Find the root node for the 'sidebar' scope.
    const sidebarRoot = viewTree.find((v) => v.scope === ViewScopes.SIDEBAR && v.type === ViewTypes.ROOT);

    // 4. Separate the children of the sidebar root into main content and bottom items based on their scope.
    const allItems = sidebarRoot?.children || [];
    
    const mainItems = allItems.filter(item => !item.scope || item.scope === ViewScopes.SIDEBAR);
    const bottomItems = allItems.filter(item => item.scope === ViewScopes.SIDEBAR_FOOTER);
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
  }, [user, flatViews]);

  return <Sidebar {...sidebarProps} />;
}
