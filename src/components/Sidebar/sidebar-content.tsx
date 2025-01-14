import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
} from '@/components/ui/sidebar';
import { API } from '@/types/typings';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type SidebarContentProps = {
  items?: API.MenuItem[];
};

function SidebarContentItem(props: SidebarContentProps) {
  function onlyTitle(item: API.MenuItem) {
    return item.title !== undefined && item.icon === undefined && item.url === undefined;
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
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild isActive={false}>
                      <Link to={subItem.url || '#'}>
                        {subItem.icon && <subItem.icon />}
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
            <Link to={item.url || '#'}>
              {item.icon && <item.icon />}
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
                    <Link to={item.url || '#'}>
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
