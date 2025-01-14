import { Icons } from '@/components/icons';

// If HOST is empty, it will use the proxy target defined in config/proxy.ts.
export const HOST = '';
export const LOGIN_URL = `/user/login`;
export const PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = ['5', '15', '25', '50', '100'];

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
