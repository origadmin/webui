import { NotFoundError, ForbiddenError } from "@/pages/errors";
import { RouteObject } from "react-router-dom";
import { MenuItem } from "@/components/Sidebar/group-content";

export const initRouter = (oldRoutes: RouteObject[], routes?: RouteObject[]) => {
  const newRoutes = oldRoutes;
  if (!routes) {
    return newRoutes;
  }
  const notFoundIndex = routes.findIndex((route) => route.path === "*" || route.path === "/404");
  if (notFoundIndex === -1) {
    // 插入 path="*" 或 path="/404" 的路由
    newRoutes.push({
      path: "*",
      Component: NotFoundError,
    });
    newRoutes.push({
      path: "/404",
      Component: NotFoundError,
    });
  } else {
    newRoutes[notFoundIndex] = {
      path: "*",
      Component: NotFoundError,
    };
    newRoutes[notFoundIndex + 1] = {
      path: "/404",
      Component: NotFoundError,
    };
  }
  // 插入 path="/403" 的路由
  const forbiddenIndex = routes.findIndex((route) => route.path === "/403");
  if (forbiddenIndex === -1) {
    newRoutes.push({
      path: "/403",
      Component: ForbiddenError,
    });
  } else {
    newRoutes[forbiddenIndex] = {
      path: "/403",
      Component: ForbiddenError,
    };
  }
  console.log("update routes", newRoutes);
  return newRoutes;
};

export const menusToTree = (menus: API.MenuItem[], parentId: string | null = null): API.ItemTree[] => {
  // Work with boundary conditions
  if (!menus || menus.length === 0) {
    return [];
  }

  // Use Map to improve lookup efficiency
  const menuMap = new Map<string, MenuItem>();
  const result: API.ItemTree[] = [];

  // Initialize the map
  for (const menu of menus) {
    menuMap.set(menu.id, { ...menu, children: [] });
  }

  // Build a tree structure
  for (const menu of menus) {
    if (menu.parent_id === parentId) {
      result.push(menuMap.get(menu.id) as API.ItemTree);
    } else {
      const parentMenu = menuMap.get(menu.parent_id as string);
      if (parentMenu) {
        parentMenu.children?.push(menuMap.get(menu.id) as API.ItemTree);
      }
    }
  }
  return result;
};

export const lazyLoad = async (path: string, name: string = "default") => {
  try {
    const module = await import(`@/pages/${path}`);
    if (module && name in module) {
      return {
        Component: module[name],
      };
    }
    return {
      Component: NotFoundError,
    };
  } catch (error) {
    console.error(`Error loading component ${name} from path ${path}:`, error);
    return {
      Component: NotFoundError,
    };
  }
};
