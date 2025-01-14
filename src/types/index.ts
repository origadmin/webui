import { API } from '@/types/typings';

import MenuItem = API.MenuItem;

// If HOST is empty, it will use the proxy target defined in config/proxy.ts.
export const HOST = '';
export const LOGIN_URL = `/user/login`;
export const PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = ['5', '15', '25', '50', '100'];

export interface MenuItemWithChildren extends MenuItem {
  items: MenuItemWithChildren[];
}

export interface MenuItemWithOptionalChildren extends MenuItem {
  items?: MenuItemWithChildren[];
}

export type MainMenuItem = MenuItemWithOptionalChildren;
export type SidebarMenuItem = MenuItemWithChildren;
