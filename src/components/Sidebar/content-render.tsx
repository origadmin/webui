import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { TablerIcon } from "../IconPicker";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

type MenuItem = API.MenuItem & {};

const renderLink = (item: API.MenuItem) => {
  return <Link to={item.path || "#"}>{renderIconTitle(item)}</Link>;
};

const renderIconTitle = (item: MenuItem) => {
  return (
    <Fragment>
      {item.icon && <TablerIcon name={item.icon} />}
      {item.title && <span>{item.title}</span>}
    </Fragment>
  );
};

const isGroupTitle = (item: MenuItem) => {
  return item.type === "G";
};

const hasSub = (item: MenuItem) => {
  return item.children !== undefined && item.children.length > 0;
};

const itemKey = (item: MenuItem, index: number, parentIndex?: string) => {
  if (item.id) {
    return parentIndex ? `${parentIndex}-${item.id}` : item.id;
  }
  return parentIndex ? `${parentIndex}-${index}` : index.toString();
};

const renderGroupItem = (item: MenuItem, index: number, parentIndex?: string) => {
  return (
    <Fragment>
      {isGroupTitle(item) && renderTitle(item, index)}
      {isGroupTitle(item) &&
        hasSub(item) &&
        item.children?.map((subItem, subIndex) => renderItem(subItem, subIndex, parentIndex))}
      {!isGroupTitle(item) && renderItem(item, index, parentIndex)}
    </Fragment>
  );
};

const renderTitle = (item: MenuItem, index: number) => {
  return <SidebarGroupLabel key={`group-title-${index}`}>{item.title}</SidebarGroupLabel>;
};

const renderItem = (item: MenuItem, index: number, parentIndex?: string) => {
  return hasSub(item) ? (
    <Collapsible
      key={itemKey(item, index, parentIndex)}
      asChild
      defaultOpen={item.isActive}
      className='group/collapsible'
    >
      <SidebarMenuItem key={itemKey(item, index, parentIndex)}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={false}>
            {renderIconTitle(item)}
            <TablerIcon
              name='chevron-right'
              className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub key={itemKey(item, index, parentIndex)}>
            {item.children?.map((subItem, subIndex) => (
              <SidebarMenuSubItem key={itemKey(subItem, subIndex, `${parentIndex ? parentIndex + "-" : ""}${index}`)}>
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
    <SidebarMenuItem key={itemKey(item, index, parentIndex)}>
      <SidebarMenuButton asChild tooltip={item.title} isActive={false}>
        {renderLink(item)}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export { renderGroupItem, renderLink, renderIconTitle, isGroupTitle, hasSub, itemKey, renderTitle, renderItem };
