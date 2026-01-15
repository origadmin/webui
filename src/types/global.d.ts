/* eslint-disable */
// @ts-ignore
import { TablerIcon } from "@tabler/icons-react";
import { RouteObject } from "@tanstack/react-router";
import { AxiosRequestConfig, AxiosBasicCredentials } from "axios";
import { LucideIcon } from "lucide-react";
import { WatermarkProps } from "@/components/Watermark";
import { components } from "./schema";


type Schemas = components["schemas"];

declare global {
  // From system/typings.d.ts (with duplicates removed)
  type CaptchaResource = {
    /** ID */
    id?: string;
  };

  type MenuResource = {
    /** Create time */
    created_at?: string;
    /** Unique ID */
    id?: string;
    /** From Menu.ID */
    menu_id?: string;
    /** HTTP method */
    method?: string;
    /** API request path (e.g. /api/v1/users/:id) */
    path?: string;
    /** Update time */
    updated_at?: string;
  };

  type RoleMenu = {
    /** Create time */
    created_at?: string;
    /** Unique ID */
    id?: string;
    /** From Menu.ID */
    menu_id?: string;
    /** From Role.ID */
    role_id?: string;
    /** Update time */
    updated_at?: string;
  };

  type UserRole = {
    /** Unique ID */
    id?: string;
    /** From User.ID */
    user_id?: string;
    /** From Role.ID */
    role_id?: string;
    /** From Role.Name */
    role_name?: string;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };

  type Logger = {
    /** Create time */
    created_at?: string;
    /** Log data */
    data?: string;
    /** Unique ID */
    id?: string;
    /** Log level */
    level?: string;
    /** Log message */
    message?: string;
    /** Error stack */
    stack?: string;
    /** Log tag */
    tag?: string;
    /** Trace ID */
    trace_id?: string;
    /** User ID */
    user_id?: string;
    /** From User.Name */
    user_name?: string;
    /** Login name From User.Username */
    login_name?: string;
  };

  type CurrentUser = {
    access?: string;
  };

  // From typings.d.ts
  namespace API {
    /**
     * Represents the pure backend API search parameters.
     */
    type Search = {
      page?: number;
      page_size?: number;
      page_token?: string;
      only_count?: boolean;
      paging_mode?: "cursor" | "offset" | "none";
      sort?: string;
    };

    type SearchParams = Record<string, unknown> & Partial<Search>;

    /**
     * Represents the parameters sent from the useDataTable hook.
     * It uses frontend-idiomatic names (camelCase).
     */
    type DataTableParams = {
      page?: number; // 0-based page index
      pageSize?: number;
      pagingMode?: "cursor" | "offset" | "none";
      pageToken?: string | null;
      [key: string]: unknown;
    };

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
      code?: number;
      reason?: string;
      message?: string;
      metadata?: Record<string, string>;
      details?: any[];
    };

    type Result<T> = {
      success?: boolean;
      items?: T[];
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

    type Route = Omit<RouteObject, "children", "element"> & {
      keyword?: string;
      component?: string;
      element?: string;
      children?: Route[];
    };

    type MenuItem = {
      id: string; // ID is mandatory for a menu item.
      name?: string;
      keyword?: string;
      title: string;
      sequence?: number;
      path?: string;
      type?: string;
      disabled?: boolean;
      external?: boolean;
      shortcut?: [string, string];
      icon?: string;
      scope?: string;
      description?: string;
      isActive?: boolean;
      children?: MenuItem[];
      parent_id?: string;
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
      logo: ElementType;
      plan: string;
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

    // From api.ts
    namespace System {
      // 根据 system.proto 的 package api.v1.services.types;
      // 键名取决于 openapi.yaml 中的定义，通常是完整包名
      export type View = Schemas["api.v1.services.types.View"];
      export type Role = Schemas["api.v1.services.types.Role"];
      export type User = Schemas["api.v1.services.types.User"];
      export type Resource = Schemas["api.v1.services.types.Resource"];
      export type Permission = Schemas["api.v1.services.types.Permission"];
      export type Menu = Schemas["api.v1.services.types.Resource"];

      // Response Types
      export type PersonalProfileResponse = Schemas["api.v1.services.auth.GetPersonalProfileResponse"];
      export type PersonalResourcesResponse = Schemas["api.v1.services.auth.ListPersonalResourcesResponse"];

      export type ListUsersResponse = Schemas["api.v1.services.system.ListUsersResponse"];
      export type GetUserResponse = Schemas["api.v1.services.system.GetUserResponse"];
      export type CreateUserResponse = Schemas["api.v1.services.system.CreateUserResponse"];
      export type ListUserResourcesResponse = Schemas["api.v1.services.system.ListUserResourcesResponse"];

      export type ListRolesResponse = Schemas["api.v1.services.system.ListRolesResponse"];
      export type GetRoleResponse = Schemas["api.v1.services.system.GetRoleResponse"];
      export type CreateRoleResponse = Schemas["api.v1.services.system.CreateRoleResponse"];

      export type ListResourcesResponse = Schemas["api.v1.services.system.ListResourcesResponse"];
      export type GetResourceResponse = Schemas["api.v1.services.system.GetResourceResponse"];
      export type CreateResourceResponse = Schemas["api.v1.services.system.CreateResourceResponse"];

      // Added View Response Types
      export type ListViewsResponse = Schemas["api.v1.services.system.ListViewsResponse"];
      export type GetViewResponse = Schemas["api.v1.services.system.GetViewResponse"];
      export type CreateViewResponse = Schemas["api.v1.services.system.CreateViewResponse"];

      // Added Permission Response Types
      export type ListPermissionsResponse = Schemas["api.v1.services.system.ListPermissionsResponse"];
      export type GetPermissionResponse = Schemas["api.v1.services.system.GetPermissionResponse"];
      export type CreatePermissionResponse = Schemas["api.v1.services.system.CreatePermissionResponse"];

      // Added Department Response Types
      export type ListDepartmentsResponse = {
        departments?: Array<{
          id?: string;
          name?: string;
          parent_id?: string;
          created_at?: string;
          updated_at?: string;
          children?: any[];
        }>;
        total?: number;
      };
      export type Department = {
        id?: string;
        name?: string;
        parent_id?: string;
        created_at?: string;
        updated_at?: string;
        children?: any[];
      };
    }

    // Added Auth Namespace
    namespace Auth {
      export type GetProfileResponse = Schemas["api.v1.services.auth.GetProfileResponse"];
      export type ListMyViewsResponse = Schemas["api.v1.services.auth.ListMyViewsResponse"];
      export type GetCaptchaResponse = Schemas["api.v1.services.auth.GetCaptchaResponse"];
      export type LoginRequest = Schemas["api.v1.services.auth.LoginRequest"];
      export type LoginResponse = Schemas["api.v1.services.auth.LoginResponse"];
    }

    export type Captcha = Schemas["api.v1.services.auth.GetCaptchaResponse"];
    export type LoginForm = Schemas["api.v1.services.auth.LoginRequest"];
    export type LoginToken = Schemas["api.v1.services.auth.LoginResponse"];
    export type UpdateLoginPassword = Schemas["google.protobuf.Any"];

    // From chat/typings.d.ts
    namespace Chat {
      type User = {
        id: string;
        name: string;
      };

      type Message = {
        id: string;
        senderId: string;
        content: string;
        timestamp: Date;
        mentions: string[];
      };

      type Chat = {
        id: string;
        name: string;
        participants: string[];
        messages: Message[];
        isGroup: boolean;
      };
    }
  }

  // From typings.d.ts
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
    watermark?: WatermarkProps;
  };
}
