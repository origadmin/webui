import { randomKey } from "@/utils/crypto";
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
} from "@/components/ui/sidebar";
import { SidebarMainContent } from "@/components/Sidebar/sidebar-main-content";
import { SidebarSecondaryContent } from "@/components/Sidebar/sidebar-secondary-content";

export type MenuItem = API.MenuItem & {};

type SidebarGroupContentProps = {
  key?: string;
  title?: string;
  items?: MenuItem[];
  main?: SidebarGroupContentProps;
  seconds?: SidebarGroupContentProps;
  props?: React.ComponentPropsWithoutRef<typeof SidebarGroup>;
};

function SidebarGroupContent({ main, seconds, items = [], props }: SidebarGroupContentProps) {
  function renderLink(item: MenuItem) {
    return <Link to={item.path || "#"}>{renderIcon(item)}</Link>;
  }

  function renderIcon(item: MenuItem) {
    return (
      <>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </>
    );
  }

  function onlyTitle(item: MenuItem) {
    return item.title !== undefined && item.icon === undefined && item.path === undefined;
  }

  function hasSub(item: MenuItem) {
    return item.children !== undefined && item.children.length > 0;
  }

  function key(item: MenuItem) {
    if (item.id !== undefined) {
      item.id = randomKey();
    }
    return item.id;
  }

  function renderSubItem(items: MenuItem[] | undefined) {
    return items?.map((item) => {
      return hasSub(item) ? (
        <Collapsible key={key(item)} asChild defaultOpen={item.isActive} className='group/collapsible'>
          <SidebarMenuItem key={key(item)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title} isActive={false}>
                {renderIcon(item)}
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children?.map((subItem) => (
                  <SidebarMenuSubItem key={key(subItem)}>
                    <SidebarMenuSubButton asChild isActive={false}>
                      {renderLink(subItem)}
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
            {renderLink(item)}
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  }

  function renderTitle(item: MenuItem) {
    return <SidebarGroupLabel key={key(item)}>{item.title}</SidebarGroupLabel>;
  }

  function renderItem(item: MenuItem) {
    return (
      <SidebarMenuItem key={key(item)}>
        <SidebarMenuButton asChild>
          <Link to={item.path || "#"}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarContent>
      {main && <SidebarMainContent {...main}></SidebarMainContent>}
      {items && (
        <SidebarGroup {...props}>
          <SidebarMenu>
            {items.map((item) => (
              <>
                {onlyTitle(item) && renderTitle(item)}
                {!onlyTitle(item) && renderItem(item)}
                {hasSub(item) && renderSubItem(item.children)}
              </>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
      {seconds && <SidebarSecondaryContent props={{ className: "mt-auto" }} {...seconds} />}
    </SidebarContent>
  );
}

export type { SidebarGroupContentProps };
export { SidebarGroupContent };
