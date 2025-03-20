import { Fragment } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { GroupContentProps } from "@/components/Sidebar/group-content";
import { itemKey, renderGroupItem } from "./content-render";

export type SecondaryContentProps = Omit<GroupContentProps, "main">;

export function SecondaryContent({ items, props }: SecondaryContentProps) {
  const isVisible = items && items.length > 0;

  return (
    isVisible && (
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item, index) => (
              <Fragment key={itemKey(item, index)}>{renderGroupItem(item, index)}</Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  );
}
