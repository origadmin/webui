import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Storage, noop } from "@/utils";

type ContextType<T = unknown> = {
  getUserId?: () => string;
  isAuthenticated: () => boolean;
  token: string | null;
  refresh?: () => Promise<string | undefined>;
  setToken: (token: string) => void;
  access?: Map<string, boolean>;
  setAccess: (access: Map<string, boolean>) => void;
  initialData: T;
  setInitialData?: (data: T) => void;
  signInPath?: string;
  signUpPath?: string;
  signOutPath?: string;
};

const Context = createContext<ContextType>({
  isAuthenticated: () => false,
  token: null,
  setToken: noop,
  setAccess: noop,
  initialData: {} as unknown,
  setInitialData: noop,
});

export type AuthProviderProps<T = unknown> = {
  getUserId?: () => string;
  isAuthenticated?: () => boolean;
  token: string | null;
  access?: Map<string, boolean>;
  initialData?: T;
  signInPath?: string;
  signUpPath?: string;
  signOutPath?: string;
  refresh?: () => Promise<string | undefined>;
  children?: React.ReactNode;
};

const AuthProvider = <T = unknown,>({
  token: userToken,
  access: userAccess,
  children,
  isAuthenticated: _isAuthenticated,
  initialData: userInitialData,
  ...props
}: AuthProviderProps<T>) => {
  const [token, _setToken] = useState(userToken);
  const [access, _setAccess] = useState(userAccess);
  const [initialData, _setInitialData] = useState(userInitialData as T);

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
      ...props,
    } as ContextType;
  }, [_isAuthenticated, token, access, initialData, props]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useAuth = () => {
  const context = useContext(Context);
  if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const useAccess = () => {
  const { access, setAccess } = useContext(Context);
  return { access, setAccess };
};

export const useToken = () => {
  const { token, setToken } = useContext(Context);
  return { token, setToken };
};

export const useInitialData = <T = InitialDataConfig,>() => {
  const { initialData, setInitialData } = useContext(Context) as ContextType<T>;
  return { initialData, setInitialData };
};

export type { ContextType as AuthContextType };
export default AuthProvider;
