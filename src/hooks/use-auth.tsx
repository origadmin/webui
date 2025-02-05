import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Storage } from "@/utils";

type ContextType = {
  isAuthenticated: () => boolean;
  token: string | null;
  refresh?: () => Promise<string | undefined>;
  setToken: (token: string) => void;
  access?: Map<string, boolean>;
  setAccess: (access: Map<string, boolean>) => void;
  initialData: unknown;
  setInitialData?: (data: unknown) => void;
  signInPath?: string;
  signUpPath?: string;
  signOutPath?: string;
};

const Context = createContext<ContextType>({
  isAuthenticated: () => false,
  token: null,
  setToken: () => void {},
  access: new Map(),
  setAccess: () => void {},
  initialData: {},
  setInitialData: () => void {},
});

type AuthProviderProps<T = never> = {
  isAuthenticated?: () => boolean;
  token: string | null;
  access?: Map<string, boolean>;
  initialData?: T;
  refresh?: () => Promise<string | undefined>;
  children: React.ReactNode;
};

const AuthProvider = <T = never,>({
  token: userToken,
  access: userAccess,
  children,
  isAuthenticated: _isAuthenticated,
  initialData: userInitialData,
}: AuthProviderProps<T>) => {
  const [token, _setToken] = useState(userToken);
  const [access, _setAccess] = useState(userAccess);
  const [initialData, _setInitialData] = useState(userInitialData);

  // const isAuthenticated = _isAuthenticated ? _isAuthenticated : () => !!token;

  useEffect(() => {
    if (token) {
      Storage.setAccessToken(token);
    }
  }, [token]);

  const contextValue = useMemo(() => {
    const isAuthenticated = _isAuthenticated ? _isAuthenticated : () => !!token;
    const setToken = (newToken: string) => {
      _setToken(newToken);
    };

    const setAccess = (newAccess: Map<string, boolean>) => {
      _setAccess(newAccess);
    };

    const setInitialData = (newData: T) => {
      _setInitialData(newData);
    };
    return {
      isAuthenticated,
      token,
      setToken,
      access,
      setAccess,
      initialData,
      setInitialData,
    };
  }, [_isAuthenticated, token, access, initialData]);
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

export const useInitialData = <T = never,>() => {
  const { initialData, setInitialData } = useContext(Context);
  const _initialData = initialData as T;
  return { initialData: _initialData, setInitialData };
};

export type { ContextType as AuthContextType };

export default AuthProvider;
