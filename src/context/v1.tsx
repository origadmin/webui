import React, { createContext, useContext, useEffect, useState } from "react";

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Menu {
  id: string;
  name: string;
  path: string;
  icon: string;
  parentId: string | null;
}

interface Route {
  id: string;
  path: string;
  component: string;
  permissions: string[];
}

interface RBACContextType {
  permissions: Permission[];
  menus: Menu[];
  routes: Route[];
  addPermission: (permission: Permission) => void;
  updatePermission: (id: string, permission: Partial<Permission>) => void;
  deletePermission: (id: string) => void;
  addMenu: (menu: Menu) => void;
  updateMenu: (id: string, menu: Partial<Menu>) => void;
  deleteMenu: (id: string) => void;
  addRoute: (route: Route) => void;
  updateRoute: (id: string, route: Partial<Route>) => void;
  deleteRoute: (id: string) => void;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBAC must be used within a RBACProvider");
  }
  return context;
};

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const loadedPermissions = localStorage.getItem("permissions");
    const loadedMenus = localStorage.getItem("menus");
    const loadedRoutes = localStorage.getItem("routes");

    if (loadedPermissions) setPermissions(JSON.parse(loadedPermissions));
    if (loadedMenus) setMenus(JSON.parse(loadedMenus));
    if (loadedRoutes) setRoutes(JSON.parse(loadedRoutes));
  }, []);

  useEffect(() => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);

  const addPermission = (permission: Permission) => {
    setPermissions([...permissions, permission]);
  };

  const updatePermission = (id: string, updatedPermission: Partial<Permission>) => {
    setPermissions(permissions.map((p) => (p.id === id ? { ...p, ...updatedPermission } : p)));
  };

  const deletePermission = (id: string) => {
    setPermissions(permissions.filter((p) => p.id !== id));
  };

  const addMenu = (menu: Menu) => {
    setMenus([...menus, menu]);
  };

  const updateMenu = (id: string, updatedMenu: Partial<Menu>) => {
    setMenus(menus.map((m) => (m.id === id ? { ...m, ...updatedMenu } : m)));
  };

  const deleteMenu = (id: string) => {
    setMenus(menus.filter((m) => m.id !== id));
  };

  const addRoute = (route: Route) => {
    setRoutes([...routes, route]);
  };

  const updateRoute = (id: string, updatedRoute: Partial<Route>) => {
    setRoutes(routes.map((r) => (r.id === id ? { ...r, ...updatedRoute } : r)));
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter((r) => r.id !== id));
  };

  return (
    <RBACContext.Provider
      value={{
        permissions,
        menus,
        routes,
        addPermission,
        updatePermission,
        deletePermission,
        addMenu,
        updateMenu,
        deleteMenu,
        addRoute,
        updateRoute,
        deleteRoute,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};
