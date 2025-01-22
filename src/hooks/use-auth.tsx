import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Storage } from "@/utils";

type ContextType = {
  token?: string | null;
  menus?: API.MenuItem[];
  routes?: API.Route[];
  setToken: (token: string) => void;
  access?: Map<string, boolean>;
  setAccess: (access: Map<string, boolean>) => void;
  signInPath?: string;
  signUpPath?: string;
};

const Context = createContext<ContextType>({
  token: null,
  setToken: (token: string) => void {},
  setAccess: (access: Map<string, boolean>) => void {},
});

type AuthProviderProps = {
  token: string | null;
  access?: Map<string, boolean>;
  refresh?: () => Promise<string | undefined>;
  children: React.ReactNode;
};

const AuthProvider = ({ token: userToken, access: userAccess, refresh, children }: AuthProviderProps) => {
  const [token, _setToken] = useState(userToken);
  const [access, _setAccess] = useState(userAccess);
  const setToken = (newToken: string) => {
    _setToken(newToken);
  };

  const setAccess = (newAccess: Map<string, boolean>) => {
    _setAccess(newAccess);
  };

  const checkAndRefreshToken = async () => {
    // if (IsExpired()) {
    if (refresh) {
      try {
        const newToken = await refresh();
        if (newToken) {
          Storage.setAccessToken(newToken);
          setToken(newToken);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        Storage.removeAccessToken();
      }
    }
  };

  useEffect(() => {
    if (token) {
      Storage.setAccessToken(token);
    }
  }, [token]);

  // useEffect(() => {}, [access]);

  const contextValue = useMemo(() => ({ token, setToken, access, setAccess }), [token, access]);
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
