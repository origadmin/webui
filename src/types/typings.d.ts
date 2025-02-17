/* eslint-disable */
// @ts-ignore
import { TablerIcon } from "@tabler/icons-react";
import { RouteObject } from "@tanstack/react-router";
import { AxiosRequestConfig, AxiosBasicCredentials } from "axios";
import { LucideIcon } from "lucide-react";


declare global {
  namespace API {
    type Search = {
      current: number;
      page_token: string; // page token used for automatic pagination
      page_size: number;
      only_count: boolean;
      no_paging: boolean;
      sort: string;
      // update_mask?: string; // update mask used for partial update
    };

    type SearchParams = Record<string, unknown> & Partial<Search>;

    type BearerAuth = {
      headerKey?: string;
      tokenType?: string;
      token?: string;
    };

    type AxiosAuthConfig = BearerAuth | (() => BearerAuth) | string | (() => string) | AxiosBasicCredentials;

    type RequestOptions<TBody = unknown> = Record<string, unknown> & {
      urlPrefix?: string;
      path?: string;
      method?: string;
      params?: SearchParams;
      headers?: Record<string, unknown>;
      body?: TBody;
      useAuth?: "auto" | "none" | "bearer" | "bearer_token" | "basic";
      auth?: AxiosAuthConfig;
      config?: Omit<AxiosRequestConfig, "url", "method", "params", "data", "headers", "auth">;
    };

    type Error = {
      id?: string;
      code?: number;
      message?: string;
      detail?: string;
      status?: string;
    };

    type Result<T> = {
      success?: boolean;
      data?: T;
      total?: number;
      error?: Error;
    };

    type Token = {
      client_id?: string;
      user_id?: string;
      access_token: string;
      refresh_token?: string;
      expiration_time?: string;
    };

    type ItemTree = Record<string, any> & {
      id: string;
      key: string;
      value: string;
      title: string;
      parent_id?: string;
      disabled?: boolean;
      children?: ItemTree[];
      [key: string]: unknown;
    };

    type Route = Omit<RouteObject, "children", "element"> & {
      keyword?: string;
      component?: string;
      element?: string;
      children?: Route[];
    };

    type MenuItem = {
      id?: string;
      name?: string;
      keyword?: string;
      title: string;
      path?: string;
      disabled?: boolean;
      external?: boolean;
      shortcut?: [string, string];
      icon?: TablerIcon | LucideIcon;
      label?: string;
      description?: string;
      isActive?: boolean;
      children?: MenuItem[];
      parent_id?: string;
    };

    type Resource = {
      id?: string;
      name?: string;
      keyword?: string;
      i18n_key?: string;
      type?: string;
      status?: number;
      uri?: string;
      operation?: string;
      method?: string;
      component?: string;
      icon?: string;
      sequence?: number;
      visible?: boolean;
      tree_path?: string;
      properties?: Record<string, string>;
      description?: string;
      parent_id?: string;
      children?: Resource[];
      parent?: Resource;
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

    type Team = {
      id?: string;
      name: string;
      avatar?: string;
      logo: ElementType;
      plan: string;
    };

    type SidebarData = {
      user: SideBarUser;
      teams: Team[];
      menuItems: MenuItem[];
    };

    type MenuItemWithChildren = MenuItem & {
      items: MenuItemWithChildren[];
    };

    type MenuItemWithOptionalChildren = MenuItem & {
      items?: MenuItemWithChildren[];
    };

    type MainMenuItem = MenuItemWithOptionalChildren;
    type SidebarMenuItem = MenuItemWithChildren;
  }

  type AuthorizationItemConfig = {
    url: string;
    method: string;
    params: Record<string, string>;
  };

  AuthorizationConfig = Record<string, AuthorizationConfigItem>;

  type Config = {
    auth: AuthorizationConfig;
  };

  type InitialDataConfig = {
    [key: string]: any;
  };
}
