import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUserComponent } from "@/components/NavUser";

type FooterProps = {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
};

function FooterContent(props: FooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <NavUserComponent user={props.user} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export type { FooterProps };
export { FooterContent };
