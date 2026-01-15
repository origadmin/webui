import { Settings, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

type FooterProps = {
  version?: string;
  menus?: {
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }[];
};

function FooterContent(props: FooterProps) {
  const { isMobile } = useSidebar();
  const version = props.version || "v1.0.0";

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Settings className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>System</span>
                  <span className='truncate text-xs'>{version}</span>
                </div>
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={isMobile ? "bottom" : "right"}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='text-xs text-muted-foreground'>System Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {props.menus?.map((menu, index) => (
                <DropdownMenuItem key={index} onClick={menu.onClick}>
                  {menu.icon}
                  <span>{menu.title}</span>
                </DropdownMenuItem>
              )) || (
                <>
                  <DropdownMenuItem>
                    <span>Global Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>About OrigAdmin</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export type { FooterProps };
export { FooterContent };
