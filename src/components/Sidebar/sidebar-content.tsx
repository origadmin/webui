import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API } from "@/types/typings";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

type SidebarContentProps = {
  items?: API.MenuItem[];
};

function SidebarContentItem(props: SidebarContentProps) {
  const { state } = useSidebar();

  function renderIcon(item: API.MenuItem, state: string) {
    // console.log("state", state);
    // state === 'collapsed' ? <item.icon size={18} /> :
    return item.icon && <item.icon />;
  }

  function onlyTitle(item: API.MenuItem) {
    return item.title !== undefined && item.icon === undefined && item.path === undefined;
  }

  function hasSub(item: API.MenuItem) {
    return item.items !== undefined && item.items.length > 0;
  }

  function renderSubItem(items: API.MenuItem[] | undefined) {
    return items?.map((item) => {
      return hasSub(item) ? (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title} isActive={false}>
                {renderIcon(item, state)}
                <span>{item.title}</span>
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild isActive={false}>
                      <Link to={subItem.path || "#"}>
                        {renderIcon(subItem, state)}
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={item.title} isActive={false}>
            <Link to={item.path || "#"}>
              {renderIcon(item, state)}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  }

  return (
    <SidebarContent>
      <SidebarMenu>
        <SidebarGroup>
          {props.items?.map((item) => (
            <>
              {onlyTitle(item) && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
              {!onlyTitle(item) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={item.path || "#"}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {hasSub(item) && renderSubItem(item.items)}
            </>
          ))}
        </SidebarGroup>
      </SidebarMenu>
    </SidebarContent>
  );
}

export type { SidebarContentProps };
export { SidebarContentItem };
