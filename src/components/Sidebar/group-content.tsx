import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

type ProcessedItem = API.MenuItem | { type: 'group-label', label: string };

export type GroupContentProps = {
  items?: ProcessedItem[];
};

// Recursive component to render menu items and their children
const RecursiveMenuItem = ({ item }: { item: API.MenuItem }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {item.icon && <TablerIcon name={item.icon} />}
            <span>{item.title}</span>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map(child => (
              <SidebarMenuItem key={child.id}>
                <Link to={child.path || "/"}>
                  {({ isActive }) => (
                    <SidebarMenuSubButton asChild isActive={isActive}>
                      <span className="flex items-center gap-2">
                        {child.icon && <TablerIcon name={child.icon} />}
                        <span className="truncate">{child.title}</span>
                      </span>
                    </SidebarMenuSubButton>
                  )}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Render a simple link if no children
  return (
    <Link to={item.path || "/"}>
      {({ isActive }) => (
        <SidebarMenuButton isActive={isActive}>
          {item.icon && <TablerIcon name={item.icon} />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      )}
    </Link>
  );
};


function GroupContent({ items = [] }: GroupContentProps) {
  return (
    // This section is now the main scrollable area
    <SidebarContent className="flex-1 overflow-y-auto">
      <SidebarMenu className="p-2">
        {items.map((item, index) => {
          if ('type' in item) {
            if (item.type === 'group-label') {
              return <SidebarGroupLabel key={`group-${item.label}-${index}`}>{item.label}</SidebarGroupLabel>;
            }
            // Separators can be handled if needed, but grouping implies separation
            return null;
          }

          const menuItem = item as API.MenuItem;
          return (
            <SidebarMenuItem key={menuItem.id}>
              <RecursiveMenuItem item={menuItem} />
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarContent>
  );
}

export type { GroupContentProps };
export { GroupContent };
