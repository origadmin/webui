import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Storage } from "@/utils";
import { IsExpired, getAccessToken } from "@/utils/storage";

type ContextType = {
  token: string | null;
  setToken?: (token: string) => void;
};

const Context = createContext<ContextType>({
  token: null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, _setToken] = useState(getAccessToken());
  const setToken = (newToken: string) => {
    _setToken(newToken);
  };

  useEffect(() => {
    if (IsExpired()) {
      Storage.removeAccessToken();
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useAuth = () => {
  return useContext(Context);
};

export default AuthProvider;
