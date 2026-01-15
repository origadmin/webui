import { Link } from "@tanstack/react-router";
import { ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import TablerIcon from "@/components/IconPicker/tabler-icon";

export type GroupContentProps = {
  items?: API.MenuItem[];
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
            <ChevronsUpDown className='ml-auto size-4' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((child) => (
              <SidebarMenuItem key={child.id}>
                <Link to={child.path || "/"}>
                  {({ isActive }) => (
                    <SidebarMenuSubButton asChild isActive={isActive}>
                      <span className='flex items-center gap-2'>
                        {child.icon && <TablerIcon name={child.icon} />}
                        <span className='truncate'>{child.title}</span>
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
    <SidebarContent className='flex-1 overflow-y-auto'>
      <SidebarMenu className='p-2'>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <RecursiveMenuItem item={item} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}

export type { GroupContentProps };
export { GroupContent };
