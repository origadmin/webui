import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getMyResources } from "@/api/auth/me";
import { buildTree } from "@/utils/tree";
import {
  SidebarComponent as Sidebar,
  SidebarProps,
} from "@/components/Sidebar";
import { Brand } from "@/components/Brand";
import { IconSettings, IconUsers } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

// A helper component to show a loading state for the menu
const MenuSkeleton = () => (
  <div className='space-y-2 px-2'>
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className='h-8 w-full' />
    ))}
  </div>
);

export function AppSidebar() {
  const { user } = useAuth();

  // Fetch menu resources from the backend
  const {
    data: resourceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-resources", "menu"],
    queryFn: () => getMyResources({ type: "MENU" }),
    enabled: !!user, // Only run the query if the user is authenticated
  });

  const sidebarProps: SidebarProps = useMemo(() => {
    if (isLoading) {
      return {
        header: { custom: <Brand /> },
        content: { custom: <MenuSkeleton /> },
      };
    }

    if (isError || !resourceData?.items) {
      // You can return a specific error state or an empty sidebar
      return {
        header: { custom: <Brand /> },
        content: {
          items: [{ type: "group-label", label: "Failed to load menu" }],
        },
      };
    }

    // The API returns a flat list of resources, we need to build a tree
    const menuTree = buildTree(resourceData.items);

    // --- Data Filtering and Processing ---
    const mainItems = menuTree.filter(
      (item) => !item.location || item.location === "sidebar",
    );
    const bottomItems = menuTree.filter(
      (item) => item.location === "bottom",
    );

    // Process main items for grouping
    const processedMainItems: (API.MenuItem | { type: "group-label"; label: string })[] = [];
    let lastGroup: string | undefined = undefined;

    mainItems.forEach((item) => {
      const group = typeof item.group === "string" ? item.group : undefined;
      if (group && group !== lastGroup) {
        processedMainItems.push({ type: "group-label", label: group });
        lastGroup = group;
      }
      processedMainItems.push(item as API.MenuItem);
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
        items: bottomItems as API.MenuItem[],
      },
      footer: {
        version: "v1.0.0",
        menus: systemMenus,
      },
    };
  }, [isLoading, isError, resourceData]);

  return <Sidebar {...sidebarProps} />;
}
