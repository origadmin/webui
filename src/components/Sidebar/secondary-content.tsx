import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { GroupContentProps } from "@/components/Sidebar/group-content";

type MenuItem = API.MenuItem & {};

export type SecondaryContentProps = Omit<GroupContentProps, "main">;

export function SecondaryContent({ items, props }: SecondaryContentProps) {
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
