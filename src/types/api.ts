/* eslint-disable @typescript-eslint/no-namespace */
import { components } from "./schema";

// 提取 Schema 定义
type Schemas = components["schemas"];

// 定义全局 API 命名空间映射
export namespace API {
  export namespace System {
    // 根据 system.proto 的 package api.v1.services.types;
    // 键名取决于 openapi.yaml 中的定义，通常是完整包名
    export type View = Schemas["api.v1.services.types.View"];
    export type Role = Schemas["api.v1.services.types.Role"];
    export type User = Schemas["api.v1.services.types.User"];
    export type Resource = Schemas["api.v1.services.types.Resource"];
    export type Permission = Schemas["api.v1.services.types.Permission"];
    // 如果生成的键名没有包前缀，可能是 export type View = Schemas['View'];
  }
}
