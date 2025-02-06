import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
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
import { MainContent } from "@/components/Sidebar/main-content";
import { SecondaryContent } from "@/components/Sidebar/secondary-content";

export type MenuItem = API.MenuItem & {};

type GroupContentProps = {
  title?: string;
  items?: MenuItem[];
  main?: React.ComponentPropsWithoutRef<typeof GroupContent>;
  seconds?: React.ComponentPropsWithoutRef<typeof GroupContent>;
  props?: React.ComponentPropsWithoutRef<typeof SidebarGroup>;
};

function GroupContent({ main, seconds, items = [], props }: GroupContentProps) {
  function renderLink(item: MenuItem) {
    return <Link to={item.path || "#"}>{renderIcon(item)}</Link>;
  }

  function renderIcon(item: MenuItem) {
    return (
      <Fragment>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Fragment>
    );
  }

  function onlyTitle(item: MenuItem) {
    return item.title !== undefined && item.icon === undefined && item.path === undefined;
  }

  function hasSub(item: MenuItem) {
    return item.children !== undefined && item.children.length > 0;
  }

  function itemKey(item: MenuItem, index: number) {
    if (item.id) {
      return item.id;
    }
    return index.toString();
  }

  function renderSubItem(items: MenuItem[] | undefined) {
    if (!items) {
      return null;
    }
    return items.map((item, index) => {
      return hasSub(item) ? (
        <Collapsible key={itemKey(item, index)} asChild defaultOpen={item.isActive} className='group/collapsible'>
          <SidebarMenuItem key={itemKey(item, index)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title} isActive={false}>
                {renderIcon(item)}
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub key={itemKey(item, index)}>
                {item.children?.map((subItem, subIndex) => (
                  <SidebarMenuSubItem key={itemKey(subItem, subIndex)}>
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
        <SidebarMenuItem key={itemKey(item, index)}>
          <SidebarMenuButton asChild tooltip={item.title} isActive={false}>
            {renderLink(item)}
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  }

  function renderTitleItem(item: MenuItem, index: number) {
    if (onlyTitle(item)) {
      return renderTitle(item, index);
    }
    return renderItem(item, index);
  }

  function renderTitle(item: MenuItem, index: number) {
    return <SidebarGroupLabel key={itemKey(item, index)}>{item.title}</SidebarGroupLabel>;
  }

  function renderItem(item: MenuItem, index: number) {
    return (
      <SidebarMenuItem key={itemKey(item, index)}>
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
      {main && <MainContent {...main} />}
      {items && (
        <SidebarGroup {...props}>
          <SidebarMenu>
            {items.map((item, index) => (
              <Fragment key={index}>
                {renderTitleItem(item, index)}
                {hasSub(item) && renderSubItem(item.children)}
              </Fragment>
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
