import { ComponentPropsWithoutRef } from "react";
import { SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import { MainContent } from "@/components/Sidebar/main-content";
import { ProjectContent } from "@/components/Sidebar/project-content";
import { SecondaryContent } from "@/components/Sidebar/secondary-content";

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
      {items && <ProjectContent items={items} {...props} />}
      {seconds && <SecondaryContent props={{ className: "mt-auto" }} {...seconds} />}
    </SidebarContent>
  );
}

export type { GroupContentProps };
export { GroupContent };
