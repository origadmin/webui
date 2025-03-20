import { Fragment } from "react";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { GroupContentProps } from "@/components/Sidebar/group-content";
import { itemKey, renderGroupItem } from "./content-render";

export type ProjectContentProps = Omit<GroupContentProps, "main">;

export function ProjectContent({ items, props }: ProjectContentProps) {
  const isVisible = items && items.length > 0;

  return (
    isVisible && (
      <SidebarGroup {...props}>
        <SidebarMenu>
          {items.map((item, index) => (
            <Fragment key={itemKey(item, index)}>{renderGroupItem(item, index)}</Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    )
  );
}
