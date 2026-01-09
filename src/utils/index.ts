// export * from "./menu"; // menu.ts exports buildMenuTree, which is unique enough.
// export * from "./icons"; // icons.ts exports getIcon.
// export * from "./locale"; // locale.ts exports t, intl, etc.
// export * from "./generateRoutes";
import * as Auth from "./auth";
import * as Chat from "./chat";
import * as Configuration from "./configuration";
import * as GenerateRoutes from "./generateRoutes";
import * as Icons from "./icons";
import * as Locale from "./locale";
import * as Menu from "./menu";
import * as Query from "./query";
import * as Request from "./request";
import * as Search from "./search";
import * as Storage from "./storage";
import * as System from "./system";

export * from "./auth";
export * from "./chat";
export * from "./configuration";
export * from "./query";
export * from "./request";
export * from "./search";
export * from "./storage";
export * from "./system";

const noop = () => {};

export {
  Storage,
  Search,
  Auth,
  Request,
  Chat,
  Configuration,
  Query,
  System,
  Menu,
  Icons,
  Locale,
  GenerateRoutes,
  noop,
};
