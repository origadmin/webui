import { Link } from "@tanstack/react-router";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import TablerIcon from "@/components/IconPicker/tabler-icon";

export type BottomContentProps = {
  items?: API.MenuItem[];
};

function BottomContent({ items = [] }: BottomContentProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    // This container has a border on top to separate it from the main content
    <div className='mt-auto border-t'>
      <SidebarMenu className='p-2'>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <Link to={item.path || "/"}>
              {({ isActive }) => (
                <SidebarMenuButton isActive={isActive}>
                  {item.icon && <TablerIcon name={item.icon} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}

export { BottomContent };
