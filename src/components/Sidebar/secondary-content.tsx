import { Fragment } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { GroupContentProps } from "@/components/Sidebar/group-content";
import { itemKey, renderGroupItem } from "./content-render";

export type SecondaryContentProps = Omit<GroupContentProps, "main">;

export function SecondaryContent({ items, props }: SecondaryContentProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items &&
            items.map((item, index) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size='sm'>
                  <Fragment key={itemKey(item, index)}>{renderGroupItem(item, index)}</Fragment>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
