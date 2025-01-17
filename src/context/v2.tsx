import React, { createContext, useContext, useEffect, useState } from "react";
import { addMenu, updateMenu, deleteMenu } from "@/services/system/menu.ts";

// ... (keep the existing interfaces)

interface User {
  id: string;
  username: string;
  roles: string[];
}

interface RBACContextType {
  // ... (keep the existing properties)
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchMenus: () => Promise<void>;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBAC must be used within a RBACProvider");
  }
  return context;
};

// Mock API functions
const mockLogin = async (username: string, password: string): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (username === "admin" && password === "password") {
    return { id: "1", username: "admin", roles: ["admin"] };
  }
  return null;
};

const mockFetchMenus = async (): Promise<Menu[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: "1", name: "Dashboard", path: "/dashboard", icon: "dashboard", parentId: null },
    { id: "2", name: "Users", path: "/users", icon: "users", parentId: null },
    { id: "3", name: "Settings", path: "/settings", icon: "settings", parentId: null },
  ];
};

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadedUser = localStorage.getItem("user");
    if (loadedUser) {
      setUser(JSON.parse(loadedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const loggedInUser = await mockLogin(username, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const fetchMenus = async () => {
    const fetchedMenus = await mockFetchMenus();
    setMenus(fetchedMenus);
  };

  // ... (keep the existing CRUD functions for permissions, menus, and routes)

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
        user,
        login,
        logout,
        fetchMenus,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};
