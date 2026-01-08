/* eslint-disable @typescript-eslint/no-namespace */
import { components } from "./schema";

// 提取 Schema 定义
type Schemas = components["schemas"];

declare global {
  namespace API {
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
    }
    export type Captcha = Schemas["api.v1.services.auth.GetCaptchaResponse"];
    export type LoginForm = Schemas["api.v1.services.auth.LoginRequest"];
    export type LoginToken = Schemas["api.v1.services.auth.LoginResponse"];
    export type UpdateLoginPassword = Schemas["google.protobuf.Any"];
  }
}
