import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Storage } from "@/utils";

type ContextType = {
  isAuthenticated: () => boolean;
  token?: string | null;
  menus?: API.MenuItem[];
  permissions?: any[];
  routes?: API.Route[];
  refresh?: () => Promise<string | undefined>;
  setToken: (token: string) => void;
  access?: Map<string, boolean>;
  setAccess: (access: Map<string, boolean>) => void;
  signInPath?: string;
  signUpPath?: string;
};

const Context = createContext<ContextType>({
  isAuthenticated: () => false,
  token: null,
  setToken: () => void {},
  setAccess: () => void {},
});

type AuthProviderProps = {
  token: string | null;
  access?: Map<string, boolean>;
  refresh?: () => Promise<string | undefined>;
  children: React.ReactNode;
  isAuthenticated: () => boolean;
};

const AuthProvider = ({
  token: userToken,
  access: userAccess,
  refresh,
  children,
  isAuthenticated = () => false,
}: AuthProviderProps) => {
  const [token, _setToken] = useState(userToken);
  const [access, _setAccess] = useState(userAccess);
  const setToken = (newToken: string) => {
    _setToken(newToken);
  };

  const setAccess = (newAccess: Map<string, boolean>) => {
    _setAccess(newAccess);
  };

  useEffect(() => {
    if (token) {
      Storage.setAccessToken(token);
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      token,
      refresh,
      setToken,
      access,
      setAccess,
    }),
    [isAuthenticated, token, access],
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useAuth = () => {
  return useContext(Context);
};

export const useAccess = () => {
  const { access, setAccess } = useContext(Context);
  return { access, setAccess };
};

export const useToken = () => {
  const { token, setToken } = useContext(Context);
  return { token, setToken };
};

export default AuthProvider;
