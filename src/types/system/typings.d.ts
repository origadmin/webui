/* eslint-disable */
// @ts-ignore
import { components } from "@/types/schema";

declare global {
  namespace API {
    namespace System {
      type User = components["schemas"]["api.v1.services.system.User"];
      type Role = components["schemas"]["api.v1.services.system.Role"];
      type Menu = components["schemas"]["api.v1.services.system.Menu"];
      type Resource = components["schemas"]["api.v1.services.system.Resource"];
    }

    type Captcha = {
      /** Captcha ID */
      captcha_id?: string;
    };

    type CaptchaResource = {
      /** ID */
      id?: string;
    };

    type LoginForm = {
      /** Captcha verify code */
      captcha_code: string;
      /** Captcha verify id */
      captcha_id: string;
      /** Login password (md5 hash) */
      password: string;
      /** Login name */
      username: string;
    };

    type LoginToken = {
      /** Access token (JWT) */
      access_token?: string;
      /** Refresh token (JWT) */
      refresh_token?: string;
      /** Expired time (Unit: second) */
      expires_at?: number;
      /** Token type (Usage: Authorization=${token_type} ${access_token}) */
      token_type?: string;
    };

    type UpdateLoginPassword = {
      /** New password (md5 hash) */
      new_password: string;
      /** Confirm password (md5 hash) */
      confirm_password?: string;
      /** Old password (md5 hash) */
      old_password: string;
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
  }
}
