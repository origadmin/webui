import { ComponentPropsWithoutRef, Fragment } from "react";
import { SidebarContent, SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { MainContent } from "@/components/Sidebar/main-content";
import { SecondaryContent } from "@/components/Sidebar/secondary-content";
import { itemKey, renderGroupItem } from "./content-render";

export type MenuItem = API.MenuItem & {};

type GroupContentProps = {
  title?: string;
  items?: MenuItem[];
  main?: ComponentPropsWithoutRef<typeof GroupContent>;
  seconds?: ComponentPropsWithoutRef<typeof GroupContent>;
  props?: ComponentPropsWithoutRef<typeof SidebarGroup>;
};

function GroupContent({ main, seconds, items = [], props }: GroupContentProps) {
  return (
    <SidebarContent>
      {main && <MainContent {...main} />}
      {items && (
        <SidebarGroup {...props}>
          <SidebarMenu>
            {items.map((item, index) => (
              <Fragment key={itemKey(item, index)}>{renderGroupItem(item, index)}</Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
      {seconds && <SecondaryContent props={{ className: "mt-auto" }} {...seconds} />}
    </SidebarContent>
  );
}

export type { GroupContentProps };
export { GroupContent };
