import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUserItem } from "@/components/NavUser";

type SidebarFooterProps = {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
};

function SidebarFooterItem(props: SidebarFooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <NavUserItem user={props.user} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export type { SidebarFooterProps };
export { SidebarFooterItem };
