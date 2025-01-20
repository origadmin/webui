import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarGroupContentProps } from "@/components/Sidebar/sidebar-group-content.tsx";

type MenuItem = API.MenuItem & {};

export type SidebarSecondaryContentProps = Omit<SidebarGroupContentProps, "main">;

export function SidebarSecondaryContent({ items, props }: SidebarSecondaryContentProps) {
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
