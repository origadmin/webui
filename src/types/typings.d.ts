import { TablerIcon } from '@tabler/icons-react';

declare namespace API {
  type Params = {
    current?: number;
    page_size?: number;
    [key: string]: unknown;
  };

  type ResponseResult<T> = {
    success?: boolean;
    data?: T;
    total?: number;
    error?: ErrorResult;
  };

  type ErrorResult = {
    id?: string;
    code?: number;
    detail?: string;
    status?: string;
  };

  type TreeItem = {
    id: string;
    key: string;
    value: string;
    title: string;
    parent_id?: string;
    disabled?: boolean;
    children?: TreeItem[];
    [key: string]: unknown;
  };

  type Route = {
    path: string;
  };

  type MenuItem = {
    key?: string;
    title: string;
    url?: string;
    disabled?: boolean;
    external?: boolean;
    shortcut?: [string, string];
    icon?: TablerIcon | LucideIcon;
    label?: string;
    description?: string;
    isActive?: boolean;
    items?: MenuItem[];
  };

  type FooterItem = {
    title: string;
    href: string;
    external?: boolean;
  };

  type Footer = {
    title: string;
    items: FooterItem[];
  };

  type SideBarUser = {
    name: string;
    email: string;
    avatar: string;
  };

  type SidebarData = {
    user: SideBarUser;
    teams: Team[];
    menuItems: MenuItem[];
  };

  type TopNav = {
    title: string;
    href: string;
    isActive: boolean;
  };
}
