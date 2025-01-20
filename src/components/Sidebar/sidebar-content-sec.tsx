import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarContentProps } from "@/components/Sidebar/sidebar-content-item.tsx";

type MenuItem = API.MenuItem & {};

type SidebarContentSecProps = Omit<SidebarContentProps, "main">;

export function SidebarContentSec({ items, props }: SidebarContentSecProps) {
  function renderIcon(item: MenuItem) {
    return (
      <a href={item.path}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </a>
    );
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items &&
            items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size='sm'>
                  {renderIcon(item)}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
