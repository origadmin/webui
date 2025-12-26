import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Storage, noop } from "@/utils";
import { clearStorage, setAuth } from "@/utils/storage";
import { getProfile } from "@/api/system/personal";

type AuthState = {
  user: API.System.User | null;
  permissions: API.System.Resource[] | null;
  token: string | null;
  loading: boolean;
};

type AuthActions = {
  login: (token: API.Token) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean; // Add this back
};

type AuthContextType = AuthState & AuthActions;

const AuthContext = createContext<AuthContextType>({
  user: null,
  permissions: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: noop,
  isAuthenticated: () => false, // Add default value
});

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    permissions: null,
    token: Storage.getAccessToken(),
    loading: true,
  });

  const initialize = useCallback(async () => {
    const token = Storage.getAccessToken();
    if (!token) {
      setAuthState((s) => ({ ...s, loading: false, user: null, token: null, permissions: null }));
      return;
    }

    try {
      const profileRes = await getProfile();
      const { user, resources } = profileRes.data;

      setAuthState((s) => ({
        ...s,
        user,
        permissions: resources,
        loading: false,
        token,
      }));
    } catch (error) {
      console.error("Initialization failed:", error);
      clearStorage();
      setAuthState({ user: null, token: null, permissions: null, loading: false });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (token: API.Token) => {
    setAuth(token);
    setAuthState((s) => ({
      ...s,
      token: token.access_token,
      loading: true,
    }));
    await initialize();
  };

  const logout = () => {
    clearStorage();
    setAuthState({
      user: null,
      permissions: null,
      token: null,
      loading: false,
    });
  };

  const isAuthenticated = () => !!authState.token;

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      isAuthenticated, // Provide it in the context
    }),
    [authState]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthProvider;
