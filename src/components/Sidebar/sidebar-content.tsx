import { randomKey, uuid } from "@/utils/crypto.tsx";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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

type MenuItem = API.MenuItem & {
  key?: string;
};

type SidebarContentProps = {
  key?: string;
  items?: MenuItem[];
};

function SidebarContentItem(props: SidebarContentProps) {
  const { key: sidebarKey = uuid() } = props;
  const { state } = useSidebar();

  function renderIcon(item: MenuItem, _: string) {
    // console.log("state", state);
    // state === 'collapsed' ? <item.icon size={18} /> :
    return item.icon && <item.icon />;
  }

  function onlyTitle(item: MenuItem) {
    return item.title !== undefined && item.icon === undefined && item.path === undefined;
  }

  function hasSub(item: MenuItem) {
    return item.items !== undefined && item.items.length > 0;
  }

  function key(item: MenuItem) {
    if (item.key !== undefined) {
      return item.key;
    } else {
      return randomKey();
    }
  }

  function renderSubItem(items: MenuItem[] | undefined) {
    return items?.map((item) => {
      return hasSub(item) ? (
        <Collapsible key={key(item)} asChild defaultOpen={item.isActive} className='group/collapsible'>
          <SidebarMenuItem key={key(item)}>
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
                  <SidebarMenuSubItem key={key(subItem)}>
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
        <SidebarMenuItem key={key(item)}>
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
    <SidebarContent key={sidebarKey}>
      <SidebarMenu>
        <SidebarGroup>
          {props.items?.map((item) => (
            <>
              {onlyTitle(item) && <SidebarGroupLabel key={key(item)}>{item.title}</SidebarGroupLabel>}
              {!onlyTitle(item) && (
                <SidebarMenuItem key={key(item)}>
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
